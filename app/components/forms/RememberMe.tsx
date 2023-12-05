export default function RememberMe() {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        name="remember_me"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-700"
      >
        Remember me
      </label>
    </div>
  );
}

