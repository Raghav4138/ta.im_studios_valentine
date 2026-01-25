import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
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

  const handleFreebieAdd = (freebie) => setFreebieItem(freebie);
  const handleFreebieRemove = () => setFreebieItem(null);

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
    if (!bouquetSelection.some((i) => i.id === product.id)) {
      setBouquetSelection([product]);
    }
  };

  const handleBouquetRemove = (id) => {
    setBouquetSelection((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckoutSubmit = (formData) => {
    setCheckoutData(formData);
    setStep(STEPS.ORDER_SUMMARY);
  };

  const handleBackFromCheckout = () => {
    if (orderFlow === 'bouquets') {
      setStep(STEPS.BOUQUETS);
      return;
    }
    setCurrentDayIndex(VALENTINE_DAYS.length - 1);
    setStep(STEPS.DAY_BUILDER);
  };

  const handleEditCheckout = () => setStep(STEPS.CHECKOUT);
  const handleBackFromOrderSummary = () => setStep(STEPS.CHECKOUT);

  const allSelectedItems =
    orderFlow === 'bouquets' ? bouquetSelection : Object.values(selectedItemsByDay).flat();

  const sortedBouquets = [...BOUQUETS].sort((a, b) => (a.height || 0) - (b.height || 0));

  const totalPrice = allSelectedItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  const deliveryCharge =
    checkoutData && checkoutData.city.toLowerCase() !== 'bathinda' ? DELIVERY_CHARGE : 0;

  let content = null;

  if (step === STEPS.LANDING) {
    content = <LandingScreen onStartHamper={handleStartBuilder} onStartBouquets={handleStartBouquets} />;
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
        onNext={() => setStep(STEPS.CHECKOUT)}
        onBack={() => setStep(STEPS.LANDING)}
        isLastDay
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
