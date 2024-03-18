import { useAuthState } from "@/stores/auth.store";
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import Social from "./Social";
// import NotRobot from "./NotRobot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { loginSchema } from "@/lib/validation";
// import { login } from "firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { BiError } from "react-icons/bi";
import { useState } from "react";
import FillMode from "@/pages/fillMode/fillMode";
import { auth } from "@/firebase/firebase";
import { useUserState } from "@/stores/user.store";
import Social from "./Social";

const Login = () => {
  const { setAuth } = useAuthState();
  const { setUser } = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      navigate("/");
    } catch (error) {
      const resulte = error as Error;
      setError(resulte.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col">
      {isLoading && <FillMode />}
      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>
      <div className="mt-3">
        <Separator />
        {error && (
          <Alert variant="destructive">
            <BiError className="h-6 w-6 -ml-1" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="* * * *" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <Button type="submit" className="w-full h-12">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Social />
    </div>
  );
};

export default Login;
