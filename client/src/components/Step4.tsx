import { useForm } from "react-hook-form";
import { ACTIVITY_LEVELS } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, updateItineraries } from "@/features/itinerarySlice";
import { useToast } from "@/hooks/use-toast";
import { ItineraryResponse } from "./types";
import axios from "axios";
import { useState } from "react";

const Step4: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{
        activityLevel: string;
        customNote: string;
    }>();
    const dispatch = useDispatch();
    const { activityLevel, customNote } = useSelector(
        (state: any) => state.itinerary.formData
    );
    const dataFromRedux = useSelector((state: any) => state.itinerary.formData);
    const { toast } = useToast();
    const [generating, setGenerating] = useState(false);

    const onSubmit = async (data: {
        activityLevel: string;
        customNote: string;
    }) => {
        setGenerating(true);
        dispatch(
            updateFormData({
                activityLevel: data.activityLevel,
                customNote: data.customNote,
            })
        );
        try {
            const response = await axios.post<ItineraryResponse>(
                import.meta.env.VITE_SERVER_URL + "/api/itinerary/generate",
                dataFromRedux,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                dispatch(updateItineraries(response.data.data));
                toast({
                    title: "Success",
                    description: "Itinerary generated successfully",
                });

                setTimeout(() => {
                    window.scrollTo({
                        top: 500,
                        behavior: "smooth",
                    });
                }, 500);
            } else {
                throw new Error(
                    response.data.message || "Itinerary generation failed"
                );
            }
        } catch (error) {
            toast({
                title: "Error",
                description:
                    "An error occurred while generating the itinerary. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setGenerating(false);
        }
    };
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Trip Details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Activity Level Selection */}
                <div className="md:m-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activity Level
                    </label>
                    <div className="grid grid-cols-2 gap-2 w-[80%] mx-auto my-4">
                        {ACTIVITY_LEVELS.map((level) => (
                            <label
                                key={level}
                                className="inline-flex items-center"
                            >
                                <input
                                    type="radio"
                                    value={level}
                                    defaultChecked={activityLevel === level}
                                    {...register("activityLevel", {
                                        required: "Select an activity level",
                                    })}
                                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    onSelect={() => {
                                        dispatch(
                                            updateFormData({
                                                activityLevel: level,
                                            })
                                        );
                                    }}
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.activityLevel && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.activityLevel.message}
                        </p>
                    )}
                </div>

                {/* Custom Note */}
                <div>
                    <label
                        htmlFor="customNote"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Additional Notes
                    </label>
                    <textarea
                        {...register("customNote", {
                            maxLength: {
                                value: 500,
                                message: "Note cannot exceed 500 characters",
                            },
                        })}
                        defaultValue={customNote}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any special requests or additional information"
                        rows={4}
                        onChange={(e) => {
                            dispatch(
                                updateFormData({
                                    customNote: e.target.value,
                                })
                            );
                        }}
                    />
                    {errors.customNote && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.customNote.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold mt-4"
                >
                    {generating
                        ? "Generating... This might take upto 20s"
                        : "Get Itinerary"}
                </button>
            </form>
        </div>
    );
};

export default Step4;
