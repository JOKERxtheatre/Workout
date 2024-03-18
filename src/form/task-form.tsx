import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { db } from "@/firebase/firebase";
import { taskSchema } from "@/lib/validation";
import { useUserState } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
// import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import FillMode from "@/pages/fillMode/fillMode";

interface Props {
  title?: string;
  isEdit?: boolean;
  onClose?: () => void;
  handler: (value: z.infer<typeof taskSchema>) => Promise<void | null>;
}

const TaskForm = ({ title = "", handler, isEdit, onClose }: Props) => {
  const { user } = useUserState();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title },
  });

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    if (!user) return null;
    setIsLoading(true);
    const promise = handler(values).finally(() => setIsLoading(false));
    toast.promise(promise, {
      success: "Successfully completed",
      error: "Something went wrong!",
      loading: "Loading...",
    });
  }

  return (
    <div>
      {isLoading && <FillMode />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tasks..."
                    {...field}
                    type="text"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            {isEdit && (
              <Button
                type="button"
                disabled={isLoading}
                className=" h-12"
                variant={"destructive"}
                onClick={onClose}
              >
                Cancel
              </Button>
            )}
            <div className="justfy-end">
              <Button type="submit" disabled={isLoading} className=" h-12">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
