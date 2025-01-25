import React from "react";

const Title: React.FC = () => {
    return (
        <div className="mt-10 flex-col items-center justify-between space-y-6 md:space-y-0 md:w-1/2 ">
            <div className="w-full flex justify-center">
                <img
                    src="/yay.svg"
                    alt="Trip Planning Illustration"
                    className=" max-w-full h-auto object-contain md:max-h-[400px] rounded-md"
                />
            </div>

            <div className="w-full text-center ml-0">
                <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
                    TRIP TUNER
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-600 ">
                    Craft Your Perfect Journey, Effortlessly
                </h2>
            </div>
        </div>
    );
};

export default Title;
