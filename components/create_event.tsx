import { useState } from "react";

export default function CreateEvent({ closeModal }: any) {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showDisplayHours, setShowDisplayHours] = useState(true);
  const handlePasswordChange = (e: any) => {
    setShowPasswordInput(e.target.checked);
  };

  const handleDisplayHoursChange = (e: any) => {
    setShowDisplayHours(e.target.checked);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="start-date" className="block text-sm font-medium">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end-date" className="block text-sm font-medium">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Checkboxes for Display Hours and Password */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="display-hours"
                checked={showDisplayHours}
                onChange={handleDisplayHoursChange}
                className="mr-2"
              />
              <label htmlFor="display-hours" className="text-sm font-medium">
                Display Hours
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="password"
                checked={showPasswordInput}
                onChange={handlePasswordChange}
                className="mr-2"
              />
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
            </div>
          </div>

          {/* Conditional Inputs */}
          {showPasswordInput && (
            <div className="mb-4">
              <label
                htmlFor="password-input"
                className="block text-sm font-medium"
              >
                Event Password
              </label>
              <input
                type="password"
                id="password-input"
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          )}

          {/* Placeholder for Display Hours Feature (if needed) */}
          {showDisplayHours && (
            <div className="mb-4">
              {/* Placeholder content for displaying hours */}
              <p className="text-sm text-gray-600">
                Event hours will be displayed.
              </p>
            </div>
          )}

          {/* Cancel and Create Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 p-2 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
