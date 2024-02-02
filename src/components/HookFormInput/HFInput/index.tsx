"use client";

import { ErrorMessage } from "@hookform/error-message";
import { Input, InputProps } from "components/ui/input";
import { useController } from "react-hook-form";

type HFInputProps = InputProps & {
  name: string;
};

export function HFInput({ name, ...props }: HFInputProps) {
  const { field: input, formState } = useController({ name: name });

  return (
    <div>
      <Input
        ref={input.ref}
        name={input.name}
        value={input.value || ""}
        onChange={input.onChange}
        onBlur={input.onBlur}
        disabled={input.disabled}
        {...props}
      />

      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <p className="text-red-700 text-sm mt-1">{message}</p>
        )}
      />
    </div>
  );
}
