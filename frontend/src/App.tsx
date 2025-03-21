import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root from "./pages/Root";
import Error from "./pages/Error";
import Login from "./pages/authorization/Login.tsx"
import Register from "./pages/authorization/Register.tsx"
import Dashboard from "@/pages/profile/dashboard/Dashboard.tsx";
import Products from "@/pages/profile/products/Products";
import ProductUpdate from "@/pages/profile/products/ProductUpdate.tsx";
import ProductCreate from "@/pages/profile/products/ProductCreate.tsx";
import Orders from "@/pages/profile/orders/Orders.tsx";
import OrderUpdate from "@/pages/profile/orders/OrderUpdate.tsx";
import Notifications from "@/pages/profile/Notifications.tsx";
import Settings from "./pages/profile/Settings.tsx";
import Chats from "@/pages/profile/chat/Chats.tsx";
import ProtectedRoute from "@/pages/authorization/ProtectedRoute.tsx";
import PublicRoute from "@/pages/authorization/PublicRoute.tsx";
import ProductView from "@/pages/shop/ProductView.tsx";
import SellerView from "@/pages/shop/SellerView.tsx";
import Shop from "@/pages/shop/Shop.tsx";
import ChatTest from "@/pages/profile/chat_test/ChatTest.tsx";


const router = createBrowserRouter([
    {

        path: "/",
        element: <Root />,
        errorElement: <Error message={'Несуществующая страничка'} />,
        children: [
            { index: true, element: <Shop/> },
            { path: "products/:productId", element: <ProductView/>},
            { path: "sellers/:sellerId", element: <SellerView/>},
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
                        path:"profile/dashboard",
                        element: <Dashboard />,
                    },
                    { path: "profile/products", element: <Products /> },
                    { path: "profile/products/create", element: <ProductCreate /> },
                    { path: "profile/products/:id", element: <ProductUpdate /> },
                    { path: "profile/orders", element: <Orders /> },
                    { path: "profile/orders/:id", element: <OrderUpdate /> },
                    { path: "profile/notifications", element: <Notifications /> },
                    { path: "profile/settings", element: <Settings /> },
                    { path: "profile/chats", element: <Chats/>},
                    { path: "profile/chat", element: <ChatTest/>},
                ],
            }
        ]
    }
]);




function App() {
    console.log("Page loaded");
    return (
       <RouterProvider router={router} />
    );
}

export default App;
