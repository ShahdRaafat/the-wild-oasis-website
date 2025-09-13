"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteBooking } from "../_lib/actions";
import { useState, useTransition } from "react";
import ConfirmDelete from "./ConfirmDelete";

function DeleteReservation({ bookingId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      try {
        await deleteBooking(bookingId);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Delete error:", error);
      }
    });
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 cursor-pointer"
      >
        <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">Delete</span>
      </button>
      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        loading={isPending}
      />
    </>
  );
}

export default DeleteReservation;
