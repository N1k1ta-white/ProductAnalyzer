import { Navigate, Outlet } from "react-router-dom";
import {Sidebar} from "@/components/Sidebar.tsx";
import {useAuth} from "@/hooks/use-auth.tsx"; // Импорт корневого состояния

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? (
        <>
            <div className='fixed inset-y-0 left-0 w-64 max-lg:hidden'>
                <Sidebar />
            </div>
            <header className='flex items-center px-4 lg:hidden'>
                <div className="py-2.5">
                        <span className="relative">
                            <button aria-label="Open navigation"
                                    className="cursor-default relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5 data-[slot=icon]:last:[&amp;:not(:nth-child(2))]:*:ml-auto data-[slot=icon]:last:[&amp;:not(:nth-child(2))]:*:size-5 sm:data-[slot=icon]:last:[&amp;:not(:nth-child(2))]:*:size-4 data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--avatar-radius:theme(borderRadius.DEFAULT)] data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6 data-[hover]:bg-zinc-950/5 data-[slot=icon]:*:data-[hover]:fill-zinc-950 data-[active]:bg-zinc-950/5 data-[slot=icon]:*:data-[active]:fill-zinc-950 dark:text-white dark:data-[slot=icon]:*:fill-zinc-400 dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white"
                                    type="button" data-headlessui-state="">
                                <span
                                    className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
                                    aria-hidden="true"></span>
                                <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
                                    <path
                                        d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z"></path>
                                </svg>
                            </button>
                        </span>
                </div>
                <div className="min-w-0 flex-1">
                    <nav className="flex flex-1 items-center gap-4 py-2.5">
                        <div aria-hidden="true" className="-ml-4 flex-1"></div>
                        <div className="flex items-center gap-3">
                                <span className="relative">
                                    <button id="headlessui-menu-button-:R1ujja:" type="button" aria-haspopup="menu"
                                            aria-expanded="false" data-headlessui-state=""
                                            className="cursor-default relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5 data-[slot=icon]:last:[&amp;:not(:nth-child(2))]:*:ml-auto data-[slot=icon]:last:[&amp;:not(:nth-child(2))]:*:size-5 sm:data-[slot=icon]:last:[&amp;:not(:nth-child(2))]:*:size-4 data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--avatar-radius:theme(borderRadius.DEFAULT)] data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6 data-[hover]:bg-zinc-950/5 data-[slot=icon]:*:data-[hover]:fill-zinc-950 data-[active]:bg-zinc-950/5 data-[slot=icon]:*:data-[active]:fill-zinc-950 dark:text-white dark:data-[slot=icon]:*:fill-zinc-400 dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white">
                                        <span
                                            className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
                                            aria-hidden="true"></span>
                                        <span data-slot="avatar"
                                              className="inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity] rounded-[--avatar-radius] *:rounded-[--avatar-radius]">
                                            <img className="size-full"
                                                 src="https://miro.medium.com/v2/resize:fit:1024/0*YdZdyjqN9z8QfA95"
                                                 alt=""/>
                                        </span>
                                    </button>
                                </span>
                        </div>
                    </nav>
                </div>
            </header>
            <main className='flex flex-1 flex-col pb-2.5 lg:min-w-0 lg:pl-64 lg:pr-2 lg:pt-2.5'>
                <div className='p-6 grow lg:rounded-lg lg:bg-white lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10'>
                    <Outlet />
                </div>
            </main>
        </>
    ) : <Navigate to="/login" replace />;
};

export default ProtectedRoute;