import { useUserState } from "@/stores/user.store";
import { CgGym } from "react-icons/cg";

import { LogOut, LucideLoader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";

const UserBox = () => {
  const { user, setUser } = useUserState();

  const navigate = useNavigate();

  if (!user) return <LucideLoader2 className="animate-spin" />;

  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  const goDashboard  = () =>{
    navigate("/dashboard")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.photoURL!} />
          <AvatarFallback>{user.email![0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user.email}
          </p>

          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar>
                <AvatarImage src={user.photoURL!} />
                <AvatarFallback>{user.email![0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1 ">
              <p className="line-clamp-1 text-sm ">
                {user.displayName ?? user.email}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={goDashboard}>
            <CgGym className="w-4 h-4 mr-2  " />
            <span>Workout</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer bg-red-700 focus:bg-red-800 mt-1"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2  " />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;
