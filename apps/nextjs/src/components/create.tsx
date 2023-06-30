import { FC, useState } from "react";
import CreateDialog from "./createDialog";

export const Create: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute bottom-8 right-8">
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-teal-500 px-4 py-2 text-white shadow-2xl"
        >
          Create
        </button>
      </div>
      <CreateDialog open={open} setOpen={setOpen} />
    </>
  );
};
