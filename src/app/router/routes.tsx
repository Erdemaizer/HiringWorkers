import { createBrowserRouter } from "react-router-dom";
import { RegistrationPage } from "../../pages/auth/RegistrationPage/components/RegistrationPage";


export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <div>Вход</div>
    },
    {
        path: '/registration',
        element: <RegistrationPage />
    }
]);