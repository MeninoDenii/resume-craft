import { Controller, useFormContext } from "react-hook-form";
import { Input } from ".";
import { ComponentProps } from "react";
import { FieldWrapper } from "../field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  required,
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
        <FieldWrapper label={label}>
          <Input {...field} {...props} />
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </FieldWrapper>
      )}
    />
  );
};
