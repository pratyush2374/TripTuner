import React from "react";
import { useForm } from "react-hook-form";
import { PREFERRED_ACTIVITIES, TOP_CURRENCIES } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep } from "@/features/itinerarySlice";

const Step2: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{
        activities: string[];
        budget: number;
        currency: string;
    }>();
    const dispatch = useDispatch();

    const onSubmit = (data: {
        activities: string[];
        budget: number;
        currency: string;
    }) => {
        dispatch(
            updateFormData({
                preferredActivities: data.activities,
                budget: data.budget.toString(),
                currency: data.currency,
            })
        );
        dispatch(nextStep());
    };

    const { preferredActivities, budget, currency } = useSelector(
        (state: any) => state.itinerary.formData
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Trip Preferences
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Activities
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {PREFERRED_ACTIVITIES.map((activity) => (
                            <label
                                key={activity}
                                className="inline-flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    value={activity}
                                    defaultChecked={preferredActivities.includes(
                                        activity
                                    )}
                                    {...register("activities", {
                                        required:
                                            "Select at least one activity",
                                        validate: (value) =>
                                            value.length > 0 ||
                                            "Select at least one activity",
                                    })}
                                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    {activity}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.activities && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.activities.message}
                        </p>
                    )}
                </div>

                {/* Budget Input */}
                <div className="flex space-x-2">
                    <div className="flex-grow">
                        <label
                            htmlFor="budget"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Budget
                        </label>
                        <input
                            type="number"
                            defaultValue={budget}
                            {...register("budget", {
                                required: "Budget is required",
                                min: {
                                    value: 1,
                                    message: "Budget must be at least 1",
                                },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter budget"
                        />
                        {errors.budget && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.budget.message}
                            </p>
                        )}
                    </div>

                    {/* Currency Dropdown */}
                    <div className="w-1/2">
                        <label
                            htmlFor="currency"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Currency
                        </label>
                        <select
                            {...register("currency", {
                                required: "Select a currency",
                            })}
                            defaultValue={currency}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Currency</option>
                            {TOP_CURRENCIES.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                        {errors.currency && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.currency.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Next Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold mt-4"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default Step2;
