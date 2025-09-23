import { XCircleIcon } from "@heroicons/react/24/solid";

function ValidationMessage({ message, onClear }) {
  if (!message) return null;

  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 ">
      <div className="flex items-center">
        <XCircleIcon className="h-6 w-6 text-red-800" />
        <p className="ml-3 text-sm text-red-800">{message}</p>
        <button
          onClick={onClear}
          className="ml-auto text-red-400 hover:text-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
export default ValidationMessage;
