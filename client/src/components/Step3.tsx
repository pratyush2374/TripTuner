import React from "react";
import { useForm } from "react-hook-form";
import { MODES_OF_TRANSPORT } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep } from "@/features/itinerarySlice";

const Step3: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{
        modeOfTransport: string;
    }>();
    const dispatch = useDispatch();

    const onSubmit = (data: { modeOfTransport: string }) => {
        dispatch(
            updateFormData({
                modeOfTransport: data.modeOfTransport,
            })
        );
        dispatch(nextStep());
    };

    const { modeOfTransport } = useSelector(
        (state: any) => state.itinerary.formData
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Transportation Preference
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Mode of Transport
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {MODES_OF_TRANSPORT.map((transport) => (
                            <label
                                key={transport}
                                className="inline-flex items-center"
                            >
                                <input
                                    type="radio"
                                    defaultChecked={
                                        modeOfTransport === transport
                                    }
                                    value={transport}
                                    {...register("modeOfTransport", {
                                        required: "Select a mode of transport",
                                    })}
                                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    {transport}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.modeOfTransport && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.modeOfTransport.message}
                        </p>
                    )}
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

export default Step3;
