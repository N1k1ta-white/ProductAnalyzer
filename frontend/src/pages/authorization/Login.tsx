import {LoginForm} from "@/components/forms/LoginForm.tsx";


function Login() {
     return (
         <div className="flex w-full min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
             <div className="w-full max-w-sm">
                 <LoginForm/>
             </div>
         </div>
     );
}

export default Login;