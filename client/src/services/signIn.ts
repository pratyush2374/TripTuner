import axios from "axios";

const signIn = async (email: string, password: string) => {
    try {
        if (!email) {
            throw new Error("Email not found");
        } else {
            const response = await axios.post(
                import.meta.env.VITE_SERVER_URL + "/api/user/sign-in",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                localStorage.setItem(
                    "ate",
                    response.data.data.accessTokenExpiry.toString()
                );
                localStorage.setItem(
                    "rte",
                    response.data.data.refreshTokenExpiry.toString()
                );
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

export default signIn;
