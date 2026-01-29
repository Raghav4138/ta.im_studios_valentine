import { useState, useCallback, useEffect, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import { VALENTINE_DAYS, BOUQUETS, READYMADE_HAMPERS, ADDONS } from './data/catalog';
import { calculateDeliveryCharge, DELIVERY_CHARGES } from './utils/deliveryCharge';
import LandingScreen from './components/LandingScreen';
import QuestionScreen from './components/QuestionScreen';
import DayBuilder from './components/DayBuilder';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import Navbar from './components/Navbar';
import HamperCard from './components/HamperCard';
import HamperDetails from './components/HamperDetails';
import AddonsScreen from './components/AddonsScreen';

const STEPS = {
  LANDING: 'landing',
  GENDER: 'gender',
  AGE: 'age',
  VIBE: 'vibe',
  DAY_BUILDER: 'day_builder',
  BOUQUETS: 'bouquets',
  READYMADE_HAMPERS: 'readymade_hampers',
  HAMPER_DETAILS: 'hamper_details',
  ADDONS: 'addons',
  CHECKOUT: 'checkout',
  ORDER_SUMMARY: 'order_summary',
};

const STORAGE_KEY = 'taimValentineState';

const getInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

function App() {
  const initialState = useMemo(() => getInitialState(), []);
  const defaultSelectedItemsByDay = useMemo(() => {
    return VALENTINE_DAYS.reduce((acc, day) => {
      acc[day.id] = [];
      return acc;
    }, {});
  }, []);

  const mergedSelectedItemsByDay = useMemo(() => {
    if (!initialState?.selectedItemsByDay) return defaultSelectedItemsByDay;
    const next = { ...defaultSelectedItemsByDay };
    Object.keys(next).forEach((dayId) => {
      if (Array.isArray(initialState.selectedItemsByDay[dayId])) {
        next[dayId] = initialState.selectedItemsByDay[dayId];
      }
    });
    return next;
  }, [defaultSelectedItemsByDay, initialState?.selectedItemsByDay]);

  const safeStep = useMemo(() => {
    const validSteps = Object.values(STEPS);
    return validSteps.includes(initialState?.step) ? initialState.step : STEPS.LANDING;
  }, [initialState?.step]);

  const [step, setStep] = useState(safeStep);
  const [answers, setAnswers] = useState(initialState?.answers || { gender: '', age: '', vibe: '' });

  const [selectedItemsByDay, setSelectedItemsByDay] = useState(mergedSelectedItemsByDay);

  const [currentDayIndex, setCurrentDayIndex] = useState(() => {
    const index = initialState?.currentDayIndex ?? 0;
    if (typeof index !== 'number') return 0;
    return Math.min(Math.max(index, 0), VALENTINE_DAYS.length - 1);
  });
  const [bouquetSelection, setBouquetSelection] = useState(initialState?.bouquetSelection || []);
  const [selectedReadymadeHamper, setSelectedReadymadeHamper] = useState(
    initialState?.selectedReadymadeHamper || null
  );
  const [orderFlow, setOrderFlow] = useState(initialState?.orderFlow || 'hamper');
  const [checkoutData, setCheckoutData] = useState(initialState?.checkoutData || null);
  const [freebieItem, setFreebieItem] = useState(initialState?.freebieItem || null);
  const [addons, setAddons] = useState(initialState?.addons || {});
  
  // Form data state to persist across navigation
  const [savedFormData, setSavedFormData] = useState(initialState?.savedFormData || null);
  const [currentDeliveryCharge, setCurrentDeliveryCharge] = useState(
    initialState?.currentDeliveryCharge || 0
  );

  useEffect(() => {
    const stateToPersist = {
      step,
      answers,
      selectedItemsByDay,
      currentDayIndex,
      bouquetSelection,
      selectedReadymadeHamper,
      orderFlow,
      checkoutData,
      freebieItem,
      addons,
      savedFormData,
      currentDeliveryCharge,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (error) {
      // Ignore write errors (e.g., storage full or blocked)
    }
  }, [
    step,
    answers,
    selectedItemsByDay,
    currentDayIndex,
    bouquetSelection,
    selectedReadymadeHamper,
    orderFlow,
    checkoutData,
    freebieItem,
    addons,
    savedFormData,
    currentDeliveryCharge,
  ]);

  const handleFreebieAdd = (freebie) => setFreebieItem(freebie);
  const handleFreebieRemove = () => setFreebieItem(null);
  
  // Callback to update delivery charge from CheckoutForm
  const handleDeliveryChargeChange = useCallback((charge) => {
    setCurrentDeliveryCharge(charge);
  }, []);

  const genderOptions = [
    { label: 'Her', value: 'Her', image: '/queen-crown.png' },
    { label: 'Him', value: 'Him', image: '/king-crown.png' },
  ];

  const ageOptions = [
    { label: '16y - 20y', value: '16 - 20', image: '/age-teen.png', subtext: 'Young Love' },
    { label: '21y - 25y', value: '21 - 25', image: '/age-young.png', subtext: 'Modern Romance' },
    { label: '25y+', value: '25+', image: '/age-adult.png', subtext: 'Timeless Love' },
  ];

  const handleGenderSelect = (value) => {
    setAnswers((prev) => ({ ...prev, gender: value }));
    setStep(STEPS.AGE);
  };

  const handleAgeSelect = (value) => {
    setAnswers((prev) => ({ ...prev, age: value }));
    setCurrentDayIndex(0);
    setStep(STEPS.DAY_BUILDER);
  };

  const handleStartBuilder = () => {
    setOrderFlow('hamper');
    setStep(STEPS.GENDER);
  };

  const handleStartBouquets = () => {
    setOrderFlow('bouquets');
    setStep(STEPS.BOUQUETS);
  };

  const handleStartReadymadeHampers = () => {
    setOrderFlow('readymade-hampers');
    setStep(STEPS.READYMADE_HAMPERS);
  };

  const handleViewHamperDetails = (hamper) => {
    setSelectedReadymadeHamper(hamper);
    setStep(STEPS.HAMPER_DETAILS);
  };

  const handleBackFromHamperDetails = () => {
    setStep(STEPS.READYMADE_HAMPERS);
  };

  const handleProceedFromHamperDetails = () => {
    setStep(STEPS.ADDONS);
  };

  // Addons screen handlers
  const handleAddonsSkip = () => {
    setStep(STEPS.CHECKOUT);
  };

  const handleAddonsContinue = () => {
    setStep(STEPS.CHECKOUT);
  };

  const handleBackFromAddons = () => {
    if (orderFlow === 'bouquets') {
      setStep(STEPS.BOUQUETS);
    } else if (orderFlow === 'readymade-hampers') {
      setStep(STEPS.HAMPER_DETAILS);
    } else {
      setCurrentDayIndex(VALENTINE_DAYS.length - 1);
      setStep(STEPS.DAY_BUILDER);
    }
  };

  const handleSelectProduct = (product) => {
    const { id: dayId, name: dayName } = VALENTINE_DAYS[currentDayIndex];
    const isAlreadySelected = selectedItemsByDay[dayId].some((item) => item.id === product.id);

    if (!isAlreadySelected) {
      const productWithDay = { ...product, dayId, dayName, qty: 1 };
      setSelectedItemsByDay((prev) => ({
        ...prev,
        [dayId]: [...prev[dayId], productWithDay],
      }));
    }
  };

  const handleUpdateProduct = (product, updates) => {
    const { id: dayId, name: dayName } = VALENTINE_DAYS[currentDayIndex];

    setSelectedItemsByDay((prev) => {
      const existing = prev[dayId] || [];
      const index = existing.findIndex((item) => item.id === product.id);

      const nextItem = {
        ...product,
        dayId,
        dayName,
        isChocolateVariant: dayId === 'chocolate-day',
        ...updates,
      };

      if (!nextItem.qty || nextItem.qty <= 0) {
        return { ...prev, [dayId]: existing.filter((i) => i.id !== product.id) };
      }

      if (index === -1) {
        return { ...prev, [dayId]: [...existing, nextItem] };
      }

      const updated = [...existing];
      updated[index] = { ...existing[index], ...nextItem };
      return { ...prev, [dayId]: updated };
    });
  };

  const handleRemoveItem = (productId) => {
    const dayId = VALENTINE_DAYS[currentDayIndex].id;
    setSelectedItemsByDay((prev) => ({
      ...prev,
      [dayId]: prev[dayId].filter((item) => item.id !== productId),
    }));
  };

  const handleNextDay = () => {
    if (currentDayIndex < VALENTINE_DAYS.length - 1) {
      setCurrentDayIndex((prev) => prev + 1);
    } else {
      setStep(STEPS.ADDONS);
    }
  };

  const handleBackDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex((prev) => prev - 1);
    } else {
      setStep(STEPS.AGE);
    }
  };

  const handleBouquetSelect = (product) => {
    if (!bouquetSelection.some((i) => i.id === product.id)) {
      setBouquetSelection([product]);
    }
  };

  const handleBouquetRemove = (id) => {
    setBouquetSelection((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckoutSubmit = (formData) => {
    setCheckoutData(formData);
    setSavedFormData(formData); // Preserve form data
    setCurrentDeliveryCharge(formData.deliveryCharge || DELIVERY_CHARGES.OUTSTATION);
    setStep(STEPS.ORDER_SUMMARY);
  };

  const handleBackFromCheckout = () => {
    setStep(STEPS.ADDONS);
  };

  const handleEditCheckout = () => setStep(STEPS.CHECKOUT);
  const handleBackFromOrderSummary = () => setStep(STEPS.CHECKOUT);

  // Calculate selected items based on order flow
  const allSelectedItems = (() => {
    if (orderFlow === 'bouquets') return bouquetSelection;
    if (orderFlow === 'readymade-hampers' && selectedReadymadeHamper) {
      return [selectedReadymadeHamper];
    }
    return Object.values(selectedItemsByDay).flat();
  })();

  const sortedBouquets = [...BOUQUETS].sort((a, b) => (a.height || 0) - (b.height || 0));

  // Calculate addons total
  const addonsTotal = ADDONS.reduce((sum, addon) => {
    const qty = addons[addon.id] || 0;
    return sum + addon.price * qty;
  }, 0);

  const itemsTotal = allSelectedItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const totalPrice = itemsTotal + addonsTotal;

  // Use delivery charge from checkout data if available, otherwise use current tracked charge
  const deliveryCharge = checkoutData?.deliveryCharge ?? currentDeliveryCharge;

  let content = null;

  if (step === STEPS.LANDING) {
    content = (
      <LandingScreen
        onStartHamper={handleStartBuilder}
        onStartBouquets={handleStartBouquets}
        onStartReadymadeHampers={handleStartReadymadeHampers}
      />
    );
  }

  if (step === STEPS.GENDER) {
    content = (
      <QuestionScreen
        question="Who is this for?"
        subtitle="Select the best for your loved one"
        options={genderOptions}
        onSelect={handleGenderSelect}
        onBack={() => setStep(STEPS.LANDING)}
      />
    );
  }

  if (step === STEPS.AGE) {
    content = (
      <QuestionScreen
        question="Select their Age"
        subtitle="although age is just a number"
        options={ageOptions}
        onSelect={handleAgeSelect}
        onBack={() => setStep(STEPS.GENDER)}
      />
    );
  }

  if (step === STEPS.DAY_BUILDER) {
    const currentDay = VALENTINE_DAYS[currentDayIndex];
    const isLastDay = currentDayIndex === VALENTINE_DAYS.length - 1;

    content = (
      <DayBuilder
        day={currentDay}
        selectedItems={selectedItemsByDay[currentDay.id]}
        onSelectProduct={handleSelectProduct}
        onRemoveItem={handleRemoveItem}
        onUpdateProduct={handleUpdateProduct}
        totalPrice={totalPrice}
        onNext={handleNextDay}
        onBack={handleBackDay}
        isLastDay={isLastDay}
      />
    );
  }

  if (step === STEPS.BOUQUETS) {
    content = (
      <DayBuilder
        day={{ id: 'bouquets', name: 'Bouquets', options: sortedBouquets }}
        selectedItems={bouquetSelection}
        onSelectProduct={handleBouquetSelect}
        onRemoveItem={handleBouquetRemove}
        totalPrice={totalPrice}
        onNext={() => setStep(STEPS.ADDONS)}
        onBack={() => setStep(STEPS.LANDING)}
        isLastDay
      />
    );
  }

  if (step === STEPS.READYMADE_HAMPERS) {
    content = (
      <div className="screen readymade-hampers-screen">
        <div className="day-header-box">
          <h1 className="day-title">Hampers</h1>
          <div className="day-divider">
            <span className="line"></span>
            <span className="diamond"></span>
            <span className="line"></span>
          </div>
          <div className="day-subtitle">Choose a ready-made hamper for your loved one</div>
        </div>
        <div className="hampers-grid">
          {READYMADE_HAMPERS.map((hamper) => (
            <HamperCard
              key={hamper.id}
              hamper={hamper}
              onViewDetails={handleViewHamperDetails}
            />
          ))}
        </div>
        <div className="hampers-back-action">
          <button className="btn btn-secondary back-button" onClick={() => setStep(STEPS.LANDING)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (step === STEPS.HAMPER_DETAILS) {
    content = (
      <HamperDetails
        hamper={selectedReadymadeHamper}
        onProceed={handleProceedFromHamperDetails}
        onBack={handleBackFromHamperDetails}
      />
    );
  }

  if (step === STEPS.ADDONS) {
    content = (
      <AddonsScreen
        addons={addons}
        setAddons={setAddons}
        onSkip={handleAddonsSkip}
        onContinue={handleAddonsContinue}
        onBack={handleBackFromAddons}
      />
    );
  }

  if (step === STEPS.CHECKOUT) {
    content = (
      <CheckoutForm
        totalPrice={totalPrice}
        onSubmit={handleCheckoutSubmit}
        onBack={handleBackFromCheckout}
        onFreebieAdd={handleFreebieAdd}
        onFreebieRemove={handleFreebieRemove}
        orderType={orderFlow}
        initialFormData={savedFormData}
        onDeliveryChargeChange={handleDeliveryChargeChange}
      />
    );
  }

  if (step === STEPS.ORDER_SUMMARY) {
    content = (
      <OrderSummary
        answers={answers}
        selectedItems={allSelectedItems}
        selectedItemsByDay={orderFlow === 'bouquets' ? { bouquets: bouquetSelection } : selectedItemsByDay}
        orderDays={orderFlow === 'bouquets' ? [{ id: 'bouquets', name: 'Bouquets' }] : VALENTINE_DAYS}
        orderType={orderFlow}
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
        formData={checkoutData}
        freebieItem={freebieItem}
        addons={addons}
        onEdit={handleEditCheckout}
        onBack={handleBackFromOrderSummary}
      />
    );
  }

  return (
    <>
      <div className="app-wrapper">
        <Navbar variant={step === STEPS.LANDING ? 'landing' : 'default'} />
        {content}
      </div>
      <Analytics />
    </>
  );
}

export default App;
