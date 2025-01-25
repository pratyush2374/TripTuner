import React from "react";
import { useForm } from "react-hook-form";
import { TOUR_TYPES } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep } from "@/features/itinerarySlice";

const Step1: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ destination: string; days: number; tourType: string }>();
    const dispatch = useDispatch();

    const onSubmit = (data: {
        destination: string;
        days: number;
        tourType: string;
    }) => {
        dispatch(
            updateFormData({
                destination: data.destination,
                days: data.days,
                tourType: data.tourType,
            })
        );
        dispatch(nextStep());
    };
    const { destination, days, tourType } = useSelector(
        (state: any) => state.itinerary.formData
    );

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center mt-2">
                Plan Your Tour
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label
                        htmlFor="destination"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Destination
                    </label>
                    <input
                        type="text"
                        defaultValue={destination}
                        {...register("destination", {
                            required: "Destination is required",
                            minLength: {
                                value: 2,
                                message:
                                    "Destination must be at least 2 characters",
                            },
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter destination"
                    />
                    {errors.destination && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.destination.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="days"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Trip Duration (Days)
                    </label>
                    <input
                        type="number"
                        defaultValue={days}
                        {...register("days", {
                            required: "Number of days is required",
                            min: {
                                value: 1,
                                message: "Trip must be at least 1 day",
                            },
                            max: {
                                value: 30,
                                message: "Trip cannot exceed 30 days",
                            },
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter number of days"
                    />
                    {errors.days && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.days.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="tourType"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Tour Type
                    </label>
                    <select
                        {...register("tourType", {
                            required: "Please select a tour type",
                        })}
                        defaultValue={tourType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Tour Type</option>
                        {TOUR_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.tourType && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.tourType.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold mt-4"
                >
                    Next
                </button>
            </form>
        </>
    );
};

export default Step1;
