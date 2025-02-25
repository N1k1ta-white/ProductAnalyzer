import {RegisterForm} from "@/components/forms/RegisterForm.tsx";

function Register() {
    return (
        <div className="flex w-full min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm/>
            </div>
        </div>
    );
}

export default Register;