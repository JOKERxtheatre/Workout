import { useAuthState } from "@/stores/auth.store";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Social from "./Social";
import NotRobot from "./NotRobot";
import { signUpSchema } from "@/lib/validation";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
// import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import FillMode from "@/pages/fillMode/fillMode";
import { BiError } from "react-icons/bi";
import { useUserState } from "@/stores/user.store";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUserState();

  const { setAuth } = useAuthState();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user)
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
      <h2 className="text-xl font-bold">SignUp</h2>
      <p className="text-muted-foreground">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("login")}
        >
          Login
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
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="* * * *"
                      {...field}
                      type="password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="* * * *"
                      type="password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-3 w-full py-5" type="submit">
            Register
          </Button>
        </form>
      </Form>
      <NotRobot />
      <Social />
    </div>
  );
};

export default SignUp;
