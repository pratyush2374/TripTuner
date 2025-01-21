import axios from "axios";

const forgotPassword = async (email: string) => {
    try {
        if (!email) {
            throw new Error("Email not found");
        } else {
            const response = await axios.post(
                import.meta.env.VITE_SERVER_URL +
                    "/api/user/send-forgot-password-link",
                {
                    email,
                }
            );

            if (response.status === 200) {
                return response.data;
            }
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw error.response.data;
            }
            if (error.request) {
                throw new Error("No response received from server");
            }
        }
        throw new Error("An error occurred while shortening the link");
    }
};

export default forgotPassword;
