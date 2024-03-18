import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";
import "@/components/shared/Navbar/Navbar.css";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { useUserState } from "@/stores/user.store";
import UserBox from "../userbox/UserBox";

function Navbar() {
  const { user } = useUserState();
  return (
    <div className="Navbar flex justify-between px-40 py-5 border-solid border-b  bg-background fixed z-50">
      <div className="logo text-3xl font-bold uppercase">
        <h1>
          <NavLink to="/">Workout</NavLink>
        </h1>
      </div>
      <div className="nav-menu flex gap-2 items-center">
        <ul className="nav-ul flex  font-semibold">
          <li>
            <NavLink to="/" className={"px-4 py-1 hover:underline"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/programs" className={"px-4 py-1 hover:underline"}>
              Programs
            </NavLink>
          </li>
        </ul>
        <ModeToggle />
        {user ? (
          <UserBox />
        ) : (
          <Link to={"/auth"}>
            <Button variant={"secondary"}>Join Free</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
