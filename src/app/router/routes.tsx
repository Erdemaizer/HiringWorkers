import { createBrowserRouter } from "react-router-dom";
import { RegistrationPage } from "../../pages/auth/RegistrationPage/components/RegistrationPage";
import { LoginPage } from "../../pages/auth/LoginPage/components/LoginPage";

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/registration',
        element: <RegistrationPage />
    }
]);