import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const checkDestination = async (destination: string): Promise<boolean> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: SchemaType.OBJECT,
                properties: {
                    isValid: {
                        type: SchemaType.BOOLEAN,
                        description: "Whether the destination is valid",
                    },
                },
                required: ["isValid"],
            },
        },
    });

    try {
        const prompt = `Determine if "${destination}" is a valid travel destination. 
       Respond with a JSON object indicating validity.`;

        const result = await model.generateContent(prompt);
        const response = JSON.parse(result.response.text());
        return response.isValid;
    } catch (error) {
        console.error("Destination validation error:", error);
        return false;
    }
};

export default checkDestination;
