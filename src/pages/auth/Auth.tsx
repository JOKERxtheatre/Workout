import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import { Card } from "@/components/ui/card";
import { useAuthState } from "@/stores/auth.store";
const Auth = () => {
  const { authState } = useAuthState();
  return (
    <div className="w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center pt-16">
      <Card className="p-8 w-1/3 relative">
        {authState === "login" && <Login />}
        {authState === "register" && <SignUp />}
      </Card>
    </div>
  );
};

export default Auth;
