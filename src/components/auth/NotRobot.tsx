import { Input } from "../ui/input";

const NotRobot = () => {
  return (
    <div className="flex items-center gap-4 my-3">
      <Input type="checkbox" className="w-[24px] h-[24px]" />
      <span className="text-lg">I'm not robot</span>
    </div>
  );
};

export default NotRobot;
