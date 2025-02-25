import { Bell, Boxes, ClipboardList, CreditCard, Home, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {cn} from "@/lib/utils.ts";

export function Sidebar() {
    const links = [
        { path: "/", label: "Обзор", icon: <Home className="size-5" /> }, // Обзор
        { path: "/products", label: "Товары", icon: <Boxes className="size-5" /> }, // Товары
        { path: "/orders", label: "Заказы", icon: <ClipboardList className="size-5" /> }, // Заказы (список)
        { path: "/payments", label: "Платежи", icon: <CreditCard className="size-5" /> },
        { path: "/notifications", label: "Уведомления", icon: <Bell className="size-5" /> },
        { path: "/settings", label: "Настройки", icon: <Settings className="size-5" /> }, // Настройки
    ];

    return (
        <div className="flex flex-col gap-2 p-2.5 h-full">
            <h1 className="text-2xl font-bold pt-7 pb-7 text-center"><i>Product Analyzer</i></h1>
            {links.map((link) => (
                <div className={`w-full ${link.path === '/settings' && 'mt-auto'}`} key={link.path}>
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
        </div>
    )
}