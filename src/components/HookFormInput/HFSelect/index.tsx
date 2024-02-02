"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ErrorMessage } from "@hookform/error-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useController } from "react-hook-form";

type HFInputProps = SelectPrimitive.SelectProps & {
  name: string;
  placeholder?: string;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export function HFSelect({
  name,
  options,
  placeholder,
  className,
  ...props
}: HFInputProps) {
  const { field: input, formState } = useController({ name: name });

  return (
    <div className={className}>
      <Select
        name={input.name}
        value={input.value || ""}
        disabled={input.disabled}
        onValueChange={input.onChange}
        onOpenChange={(e) => !e && input.onBlur()}
        {...props}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent onChange={input.onChange} onBlur={input.onBlur}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
