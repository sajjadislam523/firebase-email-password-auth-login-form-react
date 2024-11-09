import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import SignUp from "../components/SignUp";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "signup",
                    element: <SignUp />,
                },
            ],
        },
    ],

    {
        future: {
            v7_skipActionErrorRevalidation: true,
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
        },
    }
);

export default router;
