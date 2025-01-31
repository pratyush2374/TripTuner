import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <App />
                <Toaster />
            </HelmetProvider>
        </Provider>
    </StrictMode>
);
