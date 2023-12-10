import React from "react";
import { UseFormRegister } from "react-hook-form";

const FileInput = ({
  label,
  name,
  register,
  disabled,
  accept,
}: {
  accept: string;
  register: UseFormRegister<any>;
  label?: string;
  name: string;
  disabled?: boolean;
}) => {
  return (
    <div className="min-w-full flex flex-col items-start justify-start gap-1 text-text ">
      <span>select your {label} :</span>
      <input
        className="text-text p-3 rounded-[5px] border-[1px] border-accent bg-transparent min-w-full file:border-0 file:bg-transparent 
        file:text-sm 
        file:font-medium "
        type="file"
        id={name}
        accept={accept}
        disabled={disabled}
        {...register(name, { required: true })}
      />
    </div>
  );
};

export default FileInput;
