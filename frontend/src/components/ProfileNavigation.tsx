import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { updateUser } from "@/store/authSlice";
import store from "@/store/store";
import { NavLink, useNavigate } from "react-router-dom";


const ProfileNavigation = () => {

    const navigate = useNavigate();
   const handleLogout = () => {
        localStorage.removeItem(import.meta.env.VITE_JWT_KEY_TO_LOCAL_STORAGE??"");
        store.dispatch(updateUser(null))
        navigate("/login")
    }
  return (
    <>
    <div className="flex gap-4 ">
       
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <div className="relative">
        <DropdownMenuContent className="w-56 right-[-3.23rem] absolute top-[125%]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <NavLink to="profile/dashboard">
            <DropdownMenuItem className=" cursor-pointer">
              Profile
              <DropdownMenuShortcut>--</DropdownMenuShortcut>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="profile/settings">
            <DropdownMenuItem className=" cursor-pointer">
              Settings
              <DropdownMenuShortcut>--</DropdownMenuShortcut>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuItem className=" cursor-pointer" onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
        </div>
      </DropdownMenu>
      </div>
  
    </>
  );
};

export default ProfileNavigation;

