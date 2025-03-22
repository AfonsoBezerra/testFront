import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  loading?: boolean;
  render?: React.ReactNode;
  labelClassName?: string;
  help?: string;
  icons?: [
    React.FC<{ className?: string }> | undefined | null,
    (React.FC<{ className?: string }> | null)?
  ];
  tooltip?: string;
  useHelperText?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      help,
      labelClassName,
      render,
      type,
      error,
      loading,
      icons,
      useHelperText,
      ...props
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const handlePasswordView = () => setPasswordVisible(!passwordVisible);
    return (
      <div className="flex flex-col h-fit w-full relative group">
        {loading && (
          <div className="absolute inset-y-0 right-2 loader-black"></div>
        )}
        <div className="relative">
          {icons?.[0] && (
            <div className="absolute inset-y-0 left-3 flex items-center space-x-2">
              {React.createElement(icons[0], { className: "size-4" })}
            </div>
          )}
          {icons?.[1] && (
            <div className="absolute inset-y-0 right-3 flex items-center space-x-2">
              {React.createElement(icons[1], { className: "size-4" })}
            </div>
          )}
          <Slot
            onChange={() => true}
            ref={ref}
            className={cn(
              // error && "!border-destructive",
              "peer flex w-full h-[40px] border px-2 rounded-md border-gray_text/30 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
              className,
              icons?.[0] && "pl-9",
              icons?.[1] && "pr-9"
            )}
            {...props}
          >
            {!!render ? render : <input type={passwordVisible ? "text" : type} />}
          </Slot>
        </div>
        {(error || useHelperText) && (
          <p
            className={cn(
              "absolute -bottom-4 text-xs text-muted-foreground",
              error && "text-destructive"
            )}
          >
            {help}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
