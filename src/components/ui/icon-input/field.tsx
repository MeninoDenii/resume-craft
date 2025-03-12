import { Controller, useFormContext } from "react-hook-form";
import { IconInput } from ".";
import { FieldWrapper } from "../field-wrapper";

type IconInputFieldProps = {
  label: string;
  name: string;
  containerClassName?: string;
  required?: boolean;
};

export const IconField: React.FC<IconInputFieldProps> = ({
  label,
  name,
  required,
  containerClassName,
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
          <IconInput {...field} {...props} />
        </FieldWrapper>
      )}
    />
  );
};
