import { useState } from 'react';
import './App.css';
import { VALENTINE_DAYS, DELIVERY_CHARGE } from './data/catalog';
import LandingScreen from './components/LandingScreen';
import QuestionScreen from './components/QuestionScreen';
import DayBuilder from './components/DayBuilder';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';

const STEPS = {
  LANDING: 'landing',
  GENDER: 'gender',
  AGE: 'age',
  VIBE: 'vibe',
  DAY_BUILDER: 'day_builder',
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
  const [checkoutData, setCheckoutData] = useState(null);

  // Question data
  const genderOptions = [
    { label: 'Girlfriend', value: 'Girlfriend', emoji: '👩' },
    { label: 'Boyfriend', value: 'Boyfriend', emoji: '👨' },
  ];

  const ageOptions = [
    { label: '16 - 20', value: '16 - 20', emoji: '🎓' },
    { label: '21 - 25', value: '21 - 25', emoji: '💼' },
    { label: '25+', value: '25+', emoji: '⭐' },
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
    setStep(STEPS.VIBE);
  };

  const handleVibeSelect = (value) => {
    setAnswers((prev) => ({ ...prev, vibe: value }));
    setCurrentDayIndex(0);
    setStep(STEPS.DAY_BUILDER);
  };

  const handleStartBuilder = () => {
    setStep(STEPS.GENDER);
  };

  const handleSelectProduct = (product) => {
    const { id: dayId, name: dayName } = VALENTINE_DAYS[currentDayIndex];
    const isAlreadySelected = selectedItemsByDay[dayId].some(
      (item) => item.id === product.id
    );
    if (!isAlreadySelected) {
      const productWithDay = { ...product, dayId, dayName };
      setSelectedItemsByDay((prev) => ({
        ...prev,
        [dayId]: [...prev[dayId], productWithDay],
      }));
    }
  };

  const handleRemoveItem = (productId) => {
    const dayId = VALENTINE_DAYS[currentDayIndex].id;
    setSelectedItemsByDay((prev) => ({
      ...prev,
      [dayId]: prev[dayId].filter((item) => item.id !== productId),
    }));
  };

  const handleSkipDay = () => {
    if (currentDayIndex < VALENTINE_DAYS.length - 1) {
      setCurrentDayIndex((prev) => prev + 1);
    } else {
      setStep(STEPS.CHECKOUT);
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < VALENTINE_DAYS.length - 1) {
      setCurrentDayIndex((prev) => prev + 1);
    } else {
      setStep(STEPS.CHECKOUT);
    }
  };

  const handleCheckoutSubmit = (formData) => {
    setCheckoutData(formData);
    setStep(STEPS.ORDER_SUMMARY);
  };

  const handleEditCheckout = () => {
    setStep(STEPS.CHECKOUT);
  };

  // Calculate totals
  const allSelectedItems = Object.values(selectedItemsByDay).flat();
  const totalPrice = allSelectedItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge =
    checkoutData && checkoutData.city.toLowerCase() !== 'bathinda'
      ? DELIVERY_CHARGE
      : 0;

  // Render steps
  if (step === STEPS.LANDING) {
    return <LandingScreen onStart={handleStartBuilder} />;
  }

  if (step === STEPS.GENDER) {
    return (
      <QuestionScreen
        question="Who is this for?"
        options={genderOptions}
        onSelect={handleGenderSelect}
      />
    );
  }

  if (step === STEPS.AGE) {
    return (
      <QuestionScreen
        question="What's their age group?"
        options={ageOptions}
        onSelect={handleAgeSelect}
      />
    );
  }

  if (step === STEPS.VIBE) {
    return (
      <QuestionScreen
        question="What's the vibe?"
        options={vibeOptions}
        onSelect={handleVibeSelect}
      />
    );
  }

  if (step === STEPS.DAY_BUILDER) {
    const currentDay = VALENTINE_DAYS[currentDayIndex];
    const isLastDay = currentDayIndex === VALENTINE_DAYS.length - 1;

    return (
      <DayBuilder
        day={currentDay}
        selectedItems={selectedItemsByDay[currentDay.id]}
        onSelectProduct={handleSelectProduct}
        onRemoveItem={handleRemoveItem}
        totalPrice={totalPrice}
        onNext={handleNextDay}
        onSkip={handleSkipDay}
        isLastDay={isLastDay}
      />
    );
  }

  if (step === STEPS.CHECKOUT) {
    return (
      <CheckoutForm
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
        onSubmit={handleCheckoutSubmit}
        onBack={() => setStep(STEPS.DAY_BUILDER)}
      />
    );
  }

  if (step === STEPS.ORDER_SUMMARY) {
    return (
      <OrderSummary
        answers={answers}
        selectedItems={allSelectedItems}
        selectedItemsByDay={selectedItemsByDay}
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
        formData={checkoutData}
        onEdit={handleEditCheckout}
      />
    );
  }

  return null;
}

export default App;
