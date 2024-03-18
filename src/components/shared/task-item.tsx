import { Edit2, Trash } from "lucide-react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ITask, ITaskData } from "@/Types/types";
import { RxReload } from "react-icons/rx";
import { useState } from "react";
import FillMode from "@/pages/fillMode/fillMode";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { QueryObserverResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: ITask;
  onStartingEditing: () => void;
  onDelete: () => void;
  refetch: () => Promise<QueryObserverResult<ITaskData, Error>>;
}

const TaskItem = ({ task, onStartingEditing, onDelete, refetch }: Props) => {
  const [isLoading, setisLoading] = useState(false);

  const onStarted = async () => {
    setisLoading(true);
    const ref = doc(db, "tasks", task.id);
    try {
      await updateDoc(ref, {
        status: "in-progress",
        startTime: Date.now(),
      });
      refetch();
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setisLoading(false);
    }
  };
  const onPaused = async () => {
    setisLoading(true);
    const ref = doc(db, "tasks", task.id);
    try {
      const elapsed = task.startTime ? Date.now() - task.startTime : 0;
      const newTotalTime = task.totalTime || 0 + elapsed;
      await updateDoc(ref, {
        status: "paused",
        endTime: Date.now(),
        totalTime: newTotalTime,
      });
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setisLoading(false);
    }
    refetch();
  };
  const myIcons = () => {
    switch (task.status) {
      case "Unstarted":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-8 h-8"
            onClick={onStarted}
          >
            <CiPlay1 className="w-5 h-5 text-indigo-500" />
          </Button>
        );
      case "in-progress":
        return (
          <Button variant={"ghost"} size={"icon"} className="w-8 h-8">
            <CiPause1 className="w-5 h-5 text-indigo-500" onClick={onPaused} />
          </Button>
        );
      case "paused":
        return (
          <Button variant={"ghost"} size={"icon"} className="w-8 h-8">
            <RxReload className="w-5 h-5 text-indigo-500" onClick={onStarted} />
          </Button>
        );

      default:
        return null;
    }
  };
  return (
    <Card className="w-full p-4 shadow-md grid grid-cols-4 items-center relative">
      <div className="flex gap-1 items-center col-span-2">
        <MdOutlineTaskAlt className="text-blue-500" />
        <span className="capitalize">{task.title}</span>
      </div>
      <div className="flex gap-1 items-center">
        <HiStatusOnline
          className={cn(
            task.status === "Unstarted" && "text-blue-500",
            task.status === "in-progress" && "text-green-500",
            task.status === "paused" && "text-red-500"
          )}
        />
        <span className="capitalize text-sm">{task.status}</span>
      </div>
      <div className="flex gap-1 items-center justify-self-end">
        {isLoading && <FillMode />}
        {myIcons()}
        <Button
          variant={"secondary"}
          size={"icon"}
          className="w-8 h-8"
          onClick={onStartingEditing}
        >
          <Edit2 className="w-5 h-5" />
        </Button>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="w-8 h-8"
          onClick={onDelete}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
