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
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{validationError}</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => {
                  setValidationError("");
                  resetRange();
                }}
                className="text-red-400 hover:text-red-600"
              >
                <span className="sr-only">Close</span>✕
              </button>
            </div>
          </div>
        </div>
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

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights > 0 ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border bg-primary-800 text-accent-300 py-2 px-4 text-sm font-semibold cursor-pointer hover:bg-primary-700 transition-colors"
            onClick={() => {
              setValidationError("");
              resetRange();
            }}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
