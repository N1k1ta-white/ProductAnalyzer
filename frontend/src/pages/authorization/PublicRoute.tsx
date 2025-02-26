import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "@/hooks/use-auth.tsx";

const PublicRoute = () => {
    const { isAuthenticated } = useAuth(); // Проверяем, авторизован ли пользователь
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;