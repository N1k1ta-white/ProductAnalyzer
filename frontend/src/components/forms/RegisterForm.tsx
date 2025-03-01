import { GalleryVerticalEnd } from "lucide-react";
import React, { useState } from "react";
import store, { RootState } from "@/store/store.ts";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchRegisterUser } from "@/store/authSlice";
import { useSelector } from "react-redux";
import ModalError from "../modals/ModalError";
import ModalInfo from "../modals/ModalInfo";

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [state, setState] = useState({
    formState: { email: '', password: '', repeatPassword: '' },
    isModalOpen: false,
    error: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.authData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { repeatPassword, ...fState } = state.formState;
    if (repeatPassword === fState.password) {
      try {
        console.log(`register ${fState}}`);
        await store.dispatch(fetchRegisterUser(fState)).unwrap();
        navigate("/login");
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          error: (err as Error).message,
          isModalOpen: true,
        }));
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {loading && <div>Loading...</div>}

      {/* Modal Error or Info */}
      {state.isModalOpen && state.error && (
        <>
          {state.error === "User already exists" ? (
            <ModalInfo
              isOpen={state.isModalOpen}
              onClose={() => setState((prevState) => ({ ...prevState, isModalOpen: false }))}
              title="This email is already registered"
              message={state.error}
            />
          ) : state.error === "Internal server error" ? (
            <ModalError
              isOpen={state.isModalOpen}
              onClose={() => setState((prevState) => ({ ...prevState, isModalOpen: false }))}
              title="Try Again"
              message={state.error}
            />
          ) : null}
        </>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </a>
          <h1 className="text-xl font-bold">Welcome to Product Analyzer</h1>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <NavLink to="/login" className="underline underline-offset-4">
              Sign in
            </NavLink>
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Login</Label>
            <Input
              id="email"
              type="email"
              value={state.formState.email}
              onChange={(e) =>
                setState({ ...state, formState: { ...state.formState, email: e.currentTarget.value } })
              }
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={state.formState.password}
              onChange={(e) =>
                setState({ ...state, formState: { ...state.formState, password: e.currentTarget.value } })
              }
              placeholder="********"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="repeat-password">Repeat Password</Label>
            <Input
              id="repeat-password"
              type="password"
              value={state.formState.repeatPassword}
              onChange={(e) =>
                setState({ ...state, formState: { ...state.formState, repeatPassword: e.currentTarget.value } })
              }
              placeholder="********"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>

        {/* Terms and Conditions */}
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
