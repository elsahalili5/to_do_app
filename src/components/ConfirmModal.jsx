export default function ConfirmModal({ message, onConfirm, onCancel, isDark }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`w-full max-w-sm rounded-xl shadow-lg p-6 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <p className={`text-sm mb-6 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className={`text-sm px-4 py-2 rounded-lg border cursor-pointer transition-colors ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-sm px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
