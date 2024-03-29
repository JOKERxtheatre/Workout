import TaskItem from "@/components/shared/task-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BadgePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "@/form/task-form";
import { useUserState } from "@/stores/user.store";
import { taskSchema } from "@/lib/validation";
import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { TaskService } from "@/service/task.service";
import FillMode from "../fillMode/fillMode";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BiError } from "react-icons/bi";
import { ITask } from "@/Types/types";
import { toast } from "sonner";
import { addMilliseconds, addMinutes, format } from "date-fns";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserState();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCurrentTask, setIsCurrentTask] = useState<ITask | null>(null);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["Tasks-data"],
    queryFn: TaskService.getTasks,
  });

  const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;
    return addDoc(collection(db, "tasks"), {
      title,
      startTime: null,
      endtime: null,
      status: "Unstarted",
      id: user?.uid,
    })
      .then(() => refetch())
      .finally(() => setOpen(false));
  };

  const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;
    if (!isCurrentTask) return null;

    const ref = doc(db, "tasks", isCurrentTask.id);
    const promise = updateDoc(ref, {
      title,
    })
      .then(() => refetch())
      .finally(() => setIsEditing(false))
      .catch((e) => console.log(e));

    return promise;
  };

  const onDelete = async (id: string) => {
    setIsDeleting(true);
    const promise = deleteDoc(doc(db, "tasks", id))
      .then(() => refetch())
      .finally(() => setIsDeleting(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully Deleted",
      error: "Something went wrong!",
    });
  };
  const formatDate = (time: number) => {
    const date = addMilliseconds(new Date(0), time);
    const formattedDate = format(
      addMinutes(date, date.getTimezoneOffset()),
      "HH:mm:ss"
    );
    return formattedDate
  };

  const onStartingEditing = (task: ITask) => {
    setIsEditing(true);
    setIsCurrentTask(task);
  };

  return (
    <div className="h-screen max-w-6xl mx-auto flex items-center">
      <div className="grid grid-cols-2 w-full gap-8 items-center">
        <div className="flex flex-col space-y-3">
          <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary">
            <div className="text-2xl font-bold">Trainings</div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button size={"icon"} onClick={() => setOpen(true)}>
                  <BadgePlus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new Trainings</DialogTitle>
                </DialogHeader>
                <Separator />
                <TaskForm
                  handler={
                    onAdd as (
                      value: z.infer<typeof taskSchema>
                    ) => Promise<void | null>
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
          <Separator />
          <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60">
            {isPending || (isDeleting && <FillMode />)}
            {error && (
              <Alert variant="destructive">
                <BiError className="h-6 w-6 -ml-1" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {data && (
              <div className="flex flex-col space-y-3 w-full">
                {!isEditing &&
                  data.tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      refetch={refetch}
                      onStartingEditing={() => onStartingEditing(task)}
                      onDelete={() => onDelete(task.id)}
                    />
                  ))}
                {isEditing && (
                  <TaskForm
                    title={isCurrentTask?.title}
                    isEdit
                    onClose={() => setIsEditing(false)}
                    handler={
                      onUpdate as (
                        value: z.infer<typeof taskSchema>
                      ) => Promise<void | null>
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-3 relative w-full">
          <div className="p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            {isPending ? (
              <FillMode />
            ) : (
              data && (
                <div className="text-3xl font-bold">
                  {formatDate(data.weekTotal)}
                </div>
              )
            )}
          </div>
          <div className="p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24">
            <div className="text-2xl font-bold">Total month</div>
            {isPending ? (
              <FillMode />
            ) : (
              data && (
                <div className="text-3xl font-bold">
                  {formatDate(data.monthTotal)}
                </div>
              )
            )}
          </div>
          <div className="p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24">
            <div className="text-2xl font-bold">Total time</div>
            {isPending ? (
              <FillMode />
            ) : (
              data && (
                <div className="text-3xl font-bold">
                  {formatDate(data.total)}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
