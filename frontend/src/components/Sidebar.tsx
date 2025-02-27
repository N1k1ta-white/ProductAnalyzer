import { Bell, Boxes, ClipboardList, CreditCard, Home, Settings } from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import store from "@/store/store.ts";
import {updateUser} from "@/store/authSlice.ts";

export function Sidebar() {
    const navigate = useNavigate()
    const links = [
        { path: "profile/dashboard", label: "Dashboard", icon: <Home className="size-5" /> }, // Обзор
        { path: "profile/products", label: "Products", icon: <Boxes className="size-5" /> }, // Товары
        { path: "profile/orders", label: "Orders", icon: <ClipboardList className="size-5" /> }, // Заказы (список)`
        { path: "profile/notifications", label: "Notifications", icon: <Bell className="size-5" /> },
        { path: "profile/settings", label: "Settings", icon: <Settings className="size-5" /> }, // Настройки
    ];

    const handleLogout = () => {
        localStorage.removeItem(import.meta.env.VITE_JWT_KEY_TO_LOCAL_STORAGE??"");
        store.dispatch(updateUser(null))
        navigate("/login")
    }

    return (
        <div className="flex flex-col gap-2 p-2.5 h-full">
            <h1 className="text-2xl font-bold pt-7 pb-7 text-center"><i>Product Analyzer</i></h1>
            {links.map((link) => (
                <div className={`w-full`} key={link.path}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-2 p-2 rounded-lg transition-colors",
                                isActive ? "bg-zinc-300 dark:bg-zinc-800" : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            )
                        }
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                </div>
            ))}
            <Button onClick={handleLogout} className="w-full bg-red-600 text-white p-2 rounded mt-auto">Log out</Button>
        </div>
    )
}

// ${link.path === '/settings' && 'mt-auto'}