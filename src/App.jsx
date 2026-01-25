import { useState } from 'react';
import './App.css';
import { VALENTINE_DAYS, DELIVERY_CHARGE, BOUQUETS } from './data/catalog';
import LandingScreen from './components/LandingScreen';
import QuestionScreen from './components/QuestionScreen';
import DayBuilder from './components/DayBuilder';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import Navbar from './components/Navbar';

const STEPS = {
  LANDING: 'landing',
  GENDER: 'gender',
  AGE: 'age',
  VIBE: 'vibe',
  DAY_BUILDER: 'day_builder',
  BOUQUETS: 'bouquets',
  CHECKOUT: 'checkout',
  ORDER_SUMMARY: 'order_summary',
};

function App() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [answers, setAnswers] = useState({ gender: '', age: '', vibe: '' });
  const [selectedItemsByDay, setSelectedItemsByDay] = useState(
    VALENTINE_DAYS.reduce((acc, day) => {
      acc[day.id] = [];
      return acc;
    }, {})
  );
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [bouquetSelection, setBouquetSelection] = useState([]);
  const [orderFlow, setOrderFlow] = useState('hamper');
  const [checkoutData, setCheckoutData] = useState(null);
  const [freebieItem, setFreebieItem] = useState(null);

  const handleFreebieAdd = (freebie) => {
    setFreebieItem(freebie);
  };

  const handleFreebieRemove = () => {
    setFreebieItem(null);
  };

  // Question data
  const genderOptions = [
    { label: 'Her', value: 'Her', image: '/queen-crown.png' },
    { label: 'Him', value: 'Him', image: '/king-crown.png' },
  ];

  const ageOptions = [
    { label: '16y - 20y', value: '16 - 20', image: '/age-teen.png', subtext: 'Young Love' },
    { label: '21y - 25y', value: '21 - 25', image: '/age-young.png', subtext: 'Modern Romance' },
    { label: '25y+', value: '25+', image: '/age-adult.png', subtext: 'Timeless Love' },
  ];

  const vibeOptions = [
    { label: 'Cute', value: 'Cute', emoji: '🥰' },
    { label: 'Luxury', value: 'Luxury', emoji: '✨' },
    { label: 'Funny', value: 'Funny', emoji: '😂' },
    { label: 'Romantic', value: 'Romantic', emoji: '💕' },
  ];

  // Handlers
  const handleGenderSelect = (value) => {
    setAnswers((prev) => ({ ...prev, gender: value }));
    setStep(STEPS.AGE);
  };

  const handleAgeSelect = (value) => {
    setAnswers((prev) => ({ ...prev, age: value }));
    setCurrentDayIndex(0);
    setStep(STEPS.DAY_BUILDER)
    // setStep(STEPS.VIBE);
  };

  const handleVibeSelect = (value) => {
    setAnswers((prev) => ({ ...prev, vibe: value }));
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

  const handleSelectProduct = (product) => {
    const { id: dayId, name: dayName } = VALENTINE_DAYS[currentDayIndex];
    const isAlreadySelected = selectedItemsByDay[dayId].some(
      (item) => item.id === product.id
    );
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
        return {
          ...prev,
          [dayId]: existing.filter((item) => item.id !== product.id),
        };
      }

      if (index === -1) {
        return {
          ...prev,
          [dayId]: [...existing, nextItem],
        };
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
      setStep(STEPS.CHECKOUT);
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
    const isAlreadySelected = bouquetSelection.some((item) => item.id === product.id);
    if (!isAlreadySelected) {
      setBouquetSelection([product]);
    }
  };

  const handleBouquetRemove = (productId) => {
    setBouquetSelection((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleBackFromCheckout = () => {
    if (orderFlow === 'bouquets') {
      setStep(STEPS.BOUQUETS);
      return;
    }
    setCurrentDayIndex(VALENTINE_DAYS.length - 1);
    setStep(STEPS.DAY_BUILDER);
  };

  const handleBackFromOrderSummary = () => {
    setStep(STEPS.CHECKOUT);
  };

  const handleCheckoutSubmit = (formData) => {
    setCheckoutData(formData);
    setStep(STEPS.ORDER_SUMMARY);
  };

  const handleEditCheckout = () => {
    setStep(STEPS.CHECKOUT);
  };

  // Calculate totals
  const allSelectedItems =
    orderFlow === 'bouquets'
      ? bouquetSelection
      : Object.values(selectedItemsByDay).flat();
  const totalPrice = allSelectedItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  const deliveryCharge =
    checkoutData && checkoutData.city.toLowerCase() !== 'bathinda'
      ? DELIVERY_CHARGE
      : 0;

  // Build content for current step
  let content = null;
  if (step === STEPS.LANDING) {
    content = (
      <LandingScreen
        onStartHamper={handleStartBuilder}
        onStartBouquets={handleStartBouquets}
      />
    );
  } else if (step === STEPS.GENDER) {
    content = (
      <QuestionScreen
        question="Who is this for?"
        subtitle="Select the best for your loved one"
        options={genderOptions}
        onSelect={handleGenderSelect}
        onBack={() => setStep(STEPS.LANDING)}
      />
    );
  } else if (step === STEPS.AGE) {
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

  // if (step === STEPS.VIBE) {
  //   return (
  //     <QuestionScreen
  //       question="What's the vibe?"
  //       options={vibeOptions}
  //       onSelect={handleVibeSelect}
  //       onBack={() => setStep(STEPS.AGE)}
  //     />
  //   );
  // }

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
    const bouquetDay = {
      id: 'bouquets',
      name: 'Bouquets',
      options: BOUQUETS,
    };

    content = (
      <DayBuilder
        day={bouquetDay}
        selectedItems={bouquetSelection}
        onSelectProduct={handleBouquetSelect}
        onRemoveItem={handleBouquetRemove}
        totalPrice={totalPrice}
        onNext={() => setStep(STEPS.CHECKOUT)}
        onBack={() => setStep(STEPS.LANDING)}
        isLastDay={true}
      />
    );
  }

  if (step === STEPS.CHECKOUT) {
    content = (
      <CheckoutForm
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
        onSubmit={handleCheckoutSubmit}
        onBack={handleBackFromCheckout}
        onFreebieAdd={handleFreebieAdd}
        onFreebieRemove={handleFreebieRemove}
        orderType={orderFlow}
      />
    );
  }

  if (step === STEPS.ORDER_SUMMARY) {
    const orderDays =
      orderFlow === 'bouquets'
        ? [{ id: 'bouquets', name: 'Bouquets' }]
        : VALENTINE_DAYS;
    const orderItemsByDay =
      orderFlow === 'bouquets'
        ? { bouquets: bouquetSelection }
        : selectedItemsByDay;

    content = (
      <OrderSummary
        answers={answers}
        selectedItems={allSelectedItems}
        selectedItemsByDay={orderItemsByDay}
        orderDays={orderDays}
        orderType={orderFlow}
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
        formData={checkoutData}
        freebieItem={freebieItem}
        onEdit={handleEditCheckout}
        onBack={handleBackFromOrderSummary}
      />
    );
  }

  if (!content) return null;

  const isLanding = step === STEPS.LANDING;
  return (
    <div className="app-wrapper">
      <Navbar variant={isLanding ? 'landing' : 'default'} />
      {content}
    </div>
  );
}

export default App;
