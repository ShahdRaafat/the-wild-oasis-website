"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini";

export default function ConfirmDelete({ isOpen, onClose, onConfirm, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-primary-950 border border-primary-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-primary-100">
          Confirm Delete
        </h2>

        <p className="text-primary-300 mb-6">
          Are you sure you want to delete this reservation? This action cannot
          be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-primary-300 bg-primary-800 rounded hover:bg-primary-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <SpinnerMini />
            ) : (
              <>
                <TrashIcon className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
