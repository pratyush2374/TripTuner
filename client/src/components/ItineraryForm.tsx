import { useDispatch, useSelector } from "react-redux";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { ChevronLeft } from "lucide-react";
import { prevStep } from "@/features/itinerarySlice";

const ItineraryForm: React.FC = () => {
    
    const dispatch = useDispatch();
    const previousStep = () => {
        dispatch(prevStep());
    };

    const step = useSelector((state: any) => state.itinerary.step);
    return (
        <>
            <div className="md:w-[50%] w-full mt-10 mx-auto p-6 gap-2 bg-white rounded-lg shadow-md ">
                <div className="flex items-center gap-2 text-2xl font-bold">
                    <ChevronLeft
                        className="cursor-pointer"
                        onClick={previousStep}
                    />
                    {step}/4
                </div>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
            </div>
        </>
    );
};

export default ItineraryForm;
