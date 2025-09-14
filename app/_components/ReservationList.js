"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handleOptimisticDelete(bookingId) {
    optimisticDelete(bookingId);
    try {
      await deleteBooking(bookingId);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleOptimisticDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
