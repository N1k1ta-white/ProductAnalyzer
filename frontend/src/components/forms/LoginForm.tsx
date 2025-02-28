import { GalleryVerticalEnd } from "lucide-react";
import React, { useState, useEffect } from "react";
import store, { RootState } from "@/store/store.ts";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchLoginUser } from "@/store/authSlice";
import { useSelector } from "react-redux";
import ModalError from "../modals/ModalError";
import {Toaster } from "sonner"
import ModalInfo from "../modals/ModalInfo";



export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const {loading} = useSelector((state: RootState) => state.authData);

    const [error,setErrorState] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await store.dispatch(fetchLoginUser(formState)).unwrap();
            navigate("/");
        } catch (error) {
           setIsModalOpen(true)
           setErrorState((error as Error).message);
        }
    };

    useEffect(() => {
        //if(loading) toast("LOADING")
    })

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            {(error === "Invalid password") && (
                <ModalInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Try Again"
                    message={error}
                />
            )}

            {(error === "User not found") && (
                <ModalInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Try Again"
                    message={error}
                />
            )}

            {(error === "Internal server error") && (
                <ModalError
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Try Again"
                    message={error}
                />
            )}

            <form onSubmit={handleLogin}>
                <Toaster/>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a href="#" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">Welcome to Product Analyzer</h1>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <NavLink to="/register" className="underline underline-offset-4">Sign up</NavLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formState.email}
                                onChange={e => setFormState({ ...formState, email: e.currentTarget.value })}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formState.password}
                                onChange={e => setFormState({ ...formState, password: e.currentTarget.value })}
                                placeholder="********"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
