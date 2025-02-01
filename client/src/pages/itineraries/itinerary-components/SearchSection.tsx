import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchSection: React.FC = () => {
    const [text, setText] = useState("");
    const [places, setPlaces] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { toast } = useToast();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/itinerary/places/${text}`
            );
            setPlaces(response.data);
            setSelectedIndex(-1);
        } catch (error) {
            toast({
                title: "Error",
                description: "Couldn't get places",
                variant: "destructive",
            });
        }
    };

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (text !== "") {
            getData();
            console.log(places);
        } else {
            setPlaces([]);
        }
    }, [text]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (places.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex + 1) % places.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex <= 0 ? places.length - 1 : prevIndex - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < places.length) {
                const selectedPlace = places[selectedIndex];
                navigate(`/search/${encodeURIComponent(selectedPlace)}`);
            }
        }
    };

    const handleSuggestionClick = (place: any) => {
        navigate(`/search/${encodeURIComponent(place)}`);
    };

    return (
        <div className="flex items-center justify-center mt-28">
            <div className="w-full max-w-md relative">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Search itineraries by place
                </h2>
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-gray-700 leading-tight focus:outline-none"
                        placeholder="Enter place..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="p-2 bg-blue-500 text-white rounded-full focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                </div>
                {places.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
                        {places.map((place, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(place)}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    selectedIndex === index ? "bg-gray-200" : ""
                                }`}
                            >
                                {place}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchSection;
