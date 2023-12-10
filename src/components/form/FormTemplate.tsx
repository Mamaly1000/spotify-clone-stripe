import React, { ReactNode } from "react";
import CustomButton from "../inputs/Button";

const FormTemplate = ({
  children,
  actions,
  onSubmit,
  onReset,
}: {
  onSubmit: (e: any) => void;
  onReset?: (e?: any) => void;
  children?: ReactNode;
  actions: {
    reset?: {
      label?: string;
      icon?: any;
      onClick?: () => void;
      disabled?: boolean;
    };
    submit: {
      label: string;
      icon?: any;
      onClick?: () => void;
      disabled: boolean;
    };
    AdditionalActions?: ReactNode;
  };
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="min-w-full flex flex-col items-start justify-start gap-3 p-5 rounded-lg border-[1px] border-accent text-text capitalize"
    >
      {children}
      <div className="min-w-full flex-col md:flex-wrap items-center justify-end gap-2 ">
        {actions?.reset && (
          <CustomButton
            type="reset"
            onClick={() => {
              if (onReset && actions.reset?.onClick) {
                actions.reset.onClick();
                onReset();
              }
            }}
            disabled={actions.reset.disabled}
            className="bg-error text-white hover:bg-transparent "
          >
            {actions.reset.label} {actions.reset.icon}
          </CustomButton>
        )}{" "}
        <CustomButton type="submit" disabled={actions.submit.disabled}>
          {actions.submit.label} {actions.submit.icon}
        </CustomButton>
        {actions?.AdditionalActions && actions.AdditionalActions}
      </div>
    </form>
  );
};

export default FormTemplate;
