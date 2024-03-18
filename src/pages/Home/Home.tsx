import { reactIcons } from "@/constants/index";

import { Button } from "@/components/ui/button";
import men from "@/assets/photo_2024-02-16_19-54-43-removebg-preview.png";
import { programs } from "@/constants/index";
import { Card } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserState } from "@/stores/user.store";
import { CgGym } from "react-icons/cg";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";

function Home() {
  const { user, setUser } = useUserState();

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };
  return (
    <div className="Home flex flex-col gap-10">
      <section className="w-full h-screen flex items-center pt-28">
        <div className="max-w-xl ml-60 flex h-full flex-col">
          <div className="section-half-header">
            <h1 className="text-9xl uppercase">Workout with me </h1>
            <p className="text-muted-foreground">
              A huge selection of health and fitness content, healthy recipes
              and transformation stories to help you get fit and stay fit!
            </p>
            {user ? (
              <div className="flex gap-4">
                <Link to={"/dashboard"}>
                  <Button className="w-fit mt-6 font-bold h-12" size={"lg"}>
                    <span>Go To GYM</span>
                    <CgGym className="h-5 w-5 ml-2" />
                  </Button>
                </Link>

                <Link to={"/auth"}>
                  <Button
                    className="w-fit bg-destructive mt-6 font-bold h-12"
                    size={"lg"}
                    onClick={onLogout}
                  >
                    <span>LogOut</span>
                    <LogOut className="w-5 h-5 ml-2  " />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to={"/auth"}>
                <Button variant={"jclub"} className="py-6 px-3 mt-8">
                  Join club now
                </Button>
              </Link>
            )}
          </div>
          <div className="section-half-footer mt-24">
            <h2 className="text-muted-foreground text-lg uppercase">
              As featured in
            </h2>
            <div className="flex items-center gap-4 mt-2">
              {reactIcons.map((Icon, index) => {
                return <Icon key={index} className="w-12 h-12" />;
              })}
            </div>
          </div>
        </div>
        <img src={men} alt="men" className="w-1/4  -mt-24 ml-4" />
      </section>

      <div className=" max-w-5xl mx-auto">
        <h1 className="text-4xl">Not sure where to start?</h1>
        <p className="mt-2 text-muted-foreground">
          Programs offer day-to-day guidance on an interactive calendar to keep
          you on track.
        </p>
        <div className="grid grid-cols-3 gap-4 my-8">
          {programs.map((item) => (
            <Card
              key={item.title}
              className="p-8 relative cursor-pointer group"
            >
              <h3>{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.descr}</p>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform"
              >
                <FaArrowRightLong className="" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
