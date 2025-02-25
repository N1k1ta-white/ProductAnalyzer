import { GalleryVerticalEnd } from "lucide-react"
import React, {useState} from "react";
import store from "@/store/store.ts";

import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {NavLink, useNavigate} from "react-router-dom";

export function RegisterForm({ className, ...props}: React.ComponentPropsWithoutRef<"div">) {
    const [formState, setFormState] = useState({login: '', password: '', repeatPassword: ''})
    const navigate = useNavigate()
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const {repeatPassword, ...fState} = formState
            if(repeatPassword === fState.password) {
                console.log(repeatPassword, fState)
                //await store.dispatch(fetchRegister(fState)).unwrap()
                //navigate("/login")
            } else {
                alert ("Passwords does not match")
            }
        } catch (error) {
            alert("Error while register: " + (error as Error).message);
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">Welcome to Product Analyzer</h1>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <NavLink to="/login" className="underline underline-offset-4">Sign in</NavLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Login</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formState.login}
                                onChange={e => setFormState({...formState, login: e.currentTarget.value})}
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
                                onChange={e => setFormState({...formState, password: e.currentTarget.value})}
                                placeholder="********"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="repeat-password">Repeat Password</Label>
                            <Input
                                id="repeat-password"
                                type="password"
                                value={formState.repeatPassword}
                                onChange={e => setFormState({...formState, repeatPassword: e.currentTarget.value})}
                                placeholder="********"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
