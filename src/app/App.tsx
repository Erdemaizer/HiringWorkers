import { RouterProvider } from "react-router-dom"
import { routes } from "./router/routes";
import './styles/globals.css'; 

export const App = () => {
    return <RouterProvider router={routes} />;
}