import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.css';
import Image from 'next/image';
import { useState } from 'react';

export const Calendar = ({ className }: { className?: string }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderDayContents = (day: number, date: Date) => {
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const dayClassName = isCurrentMonth ? styles.currentMonthDay : styles.otherMonthDay;

    return (
      <div className={styles.dayContainer}>
        <span className={dayClassName}>{day}</span>
        <Image
          src="/images/meat/meat-removebg.png"
          alt="Meat"
          width={30}
          height={30}
          className={styles.meatImage}
        />
      </div>
    );
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => {
    const handleDecreaseMonth = () => {
      decreaseMonth();
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const handleIncreaseMonth = () => {
      increaseMonth();
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    return (
      <div className={styles.customHeader}>
        <button onClick={handleDecreaseMonth} disabled={prevMonthButtonDisabled}>
          {'<'}
        </button>
        <span className={styles.customHeaderText}>
          {date.toLocaleString('ja-JP', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleIncreaseMonth} disabled={nextMonthButtonDisabled}>
          {'>'}
        </button>
      </div>
    );
  };

  return (
    <div className={`${styles.calendar} ${className} flex w-full justify-center`}>
      <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px]">
        <DatePicker
          inline
          readOnly
          selected={currentMonth}
          onChange={(date: Date | null) => date && setCurrentMonth(date)}
          dayClassName={(date) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            if (isToday) return styles.currentDay;
            return isCurrentMonth ? styles.currentMonthDay : styles.otherMonthDay;
          }}
          renderDayContents={renderDayContents}
          renderCustomHeader={renderCustomHeader}
          disabledKeyboardNavigation
        />
      </div>
    </div>
  );
};
