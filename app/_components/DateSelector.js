"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_contexts/ReservationContext";
import { useState } from "react";
import ValidationMessage from "./ValidationMessage";
import PriceSummary from "./ReservationSummary";

function isAlreadyBooked(range, datesArr) {
  if (!range || !range.from || !range.to) {
    return false;
  }

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from, end: range.to })
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const [validationError, setValidationError] = useState("");

  const handleRangeChange = (newRange) => {
    setValidationError("");

    // If no range selected, allow clearing
    if (!newRange || !newRange.from) {
      setRange(newRange);
      return;
    }

    // If only 'from' is selected, allow it (user is still selecting)
    if (newRange.from && !newRange.to) {
      setRange(newRange);
      return;
    }

    // If both dates are selected, validate
    if (newRange.from && newRange.to) {
      // Prevent selecting same day (single day selection)
      if (isSameDay(newRange.from, newRange.to)) {
        setValidationError(
          "Cannot select the same day. Please choose a valid stay period."
        );
        // Don't return here, instead clear the 'to' date to allow reselection
        setRange({ from: newRange.from, to: undefined });
        return;
      }

      const nights = differenceInDays(newRange.to, newRange.from);

      if (nights < settings.minBookingLength) {
        setValidationError(
          `Minimum booking is ${settings.minBookingLength} ${
            settings.minBookingLength === 1 ? "night" : "nights"
          }. You selected only ${nights} ${nights === 1 ? "night" : "nights"}.`
        );
        return;
      }

      if (nights > settings.maxBookingLength) {
        setValidationError(
          `Maximum booking is ${settings.maxBookingLength} nights. You selected ${nights} nights.`
        );
        return;
      }
    }

    // All validations passed
    setRange(newRange);
  };

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = (regularPrice - discount) * numNights;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      {/* Validation Error Message */}
      {validationError && (
        <ValidationMessage
          message={validationError}
          onClear={() => {
            setValidationError("");
            resetRange();
          }}
        />
      )}

      {/* Booking Guidelines */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Booking Guidelines:</strong> Minimum {minBookingLength}{" "}
          {minBookingLength === 1 ? "night" : "nights"}, Maximum{" "}
          {maxBookingLength} nights
        </p>
      </div>

      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={handleRangeChange}
        selected={displayRange}
        startMonth={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <PriceSummary
        regularPrice={regularPrice}
        discount={discount}
        nights={numNights}
        total={cabinPrice}
        showClear={!!(range?.from || range?.to)}
        onClear={() => {
          setValidationError("");
          resetRange();
        }}
      />
    </div>
  );
}

export default DateSelector;
