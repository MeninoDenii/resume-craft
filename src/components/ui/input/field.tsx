import { Controller, useFormContext } from "react-hook-form";
import { Input } from ".";
import { ComponentProps, ReactNode } from "react";
import { FieldWrapper } from "../field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
  label: string;
  name: string;
  containerClassName?: string;
  extraContent?: (value: string) => ReactNode;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  required,
  containerClassName,
  extraContent,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      rules={{
        required: required && "Campo obrigatório",
      }}
      name={name}
      render={({ field, fieldState }) => (
        <FieldWrapper
          label={label}
          className={containerClassName}
          error={fieldState?.error}
        >
          <Input {...field} {...props} />
          {extraContent && extraContent(field.value)}
        </FieldWrapper>
      )}
    />
  );
};
