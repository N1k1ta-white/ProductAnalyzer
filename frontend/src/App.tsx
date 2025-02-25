import {createBrowserRouter, RouterProvider} from "react-router-dom";

import store from "@/store/store.ts";

import Root from "./pages/Root";
import Error from "./pages/Error";
import Login from "./pages/authorization/Login.tsx"
import Register from "./pages/authorization/Register.tsx"
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Products from "./pages/products/Products";
import ProductUpdate from "./pages/products/ProductUpdate.tsx";
import ProductCreate from "@/pages/products/ProductCreate.tsx";
import Orders from "./pages/orders/Orders.tsx";
import OrderUpdate from "@/pages/orders/OrderUpdate.tsx";
import Payments from "@/pages/payments/Payments.tsx";
import PaymentUpdate from "@/pages/payments/PaymentUpdate.tsx";
import Notifications from "@/pages/Notifications.tsx";
import Settings from "./pages/Settings";
import ProtectedRoute from "@/pages/authorization/ProtectedRoute.tsx";
import PublicRoute from "@/pages/authorization/PublicRoute.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error message={'Несуществующая страничка'} />,
        children: [
            {
                element: <PublicRoute />, // Защищает страницы от авторизованных пользователей
                children: [
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> }
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                        // loader: async () => {
                        //     const state = store.getState();
                        //     const user = state.authData.user;
                        //     if (user) {
                        //         console.log("Пользователь уже загружен:", user);
                        //         return user;
                        //     }
                        //     try {
                        //         return await store.dispatch(fetchUser()).unwrap();
                        //     } catch (error) {
                        //         console.error("Ошибка загрузки данных пользователя:", error);
                        //         throw error;
                        //     }
                        // }
                    },
                    { path: "products", element: <Products /> },
                    { path: "products/create", element: <ProductCreate /> },
                    { path: "products/:id", element: <ProductUpdate /> },
                    { path: "orders", element: <Orders /> },
                    { path: "orders/:id", element: <OrderUpdate /> },
                    { path: "payments", element: <Payments /> },
                    { path: "payments/:id", element: <PaymentUpdate /> },
                    { path: "notifications", element: <Notifications /> },
                    { path: "settings", element: <Settings /> },
                ],
            }
        ]
    }
]);


function App() {
    return (
       <RouterProvider router={router} />
    );
}

export default App;
