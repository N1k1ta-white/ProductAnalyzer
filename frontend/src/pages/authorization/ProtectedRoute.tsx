import {Navigate, NavLink, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/use-auth.tsx"; // Импорт корневого состояния
import ProfileNavigation from "@/components/ProfileNavigation";
import {Bell, Boxes, ClipboardList, Home, Settings} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {Card} from "@/components/ui/card.tsx";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();
    const links = [
        { path: "profile/dashboard", label: "Dashboard", icon: <Home className="size-5" /> }, // Обзор
        { path: "profile/products", label: "Products", icon: <Boxes className="size-5" /> }, // Товары
        { path: "profile/orders", label: "Orders", icon: <ClipboardList className="size-5" /> }, // Заказы (список)`
        { path: "profile/notifications", label: "Notifications", icon: <Bell className="size-5" /> },
        { path: "profile/settings", label: "Settings", icon: <Settings className="size-5" /> }, // Настройки
    ];
    return isAuthenticated ? (
        <Card className="bg-white m-10 h-[calc(100dvh-5rem)] flex flex-col">
            <header className="w-full flex items-center justify-start px-4 gap-12 border-b-[1px] border-b-gray-200">
                <h1 className="text-2xl font-bold pt-3 pb-3 text-center cursor-pointer" onClick={() => navigate("/")}><i>PA</i></h1>
                <div className="flex gap-4">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                cn(
                                    "text-[0.9rem]",
                                    isActive ? "text-black font-bold" : "text-gray-500"
                                )
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <div className="ml-auto">
                    <ProfileNavigation />
                </div>
            </header>

            {/* Main теперь занимает всю оставшуюся высоту */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </Card>
    ) : <Navigate to="/login" replace />;
};

export default ProtectedRoute;