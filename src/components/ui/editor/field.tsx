import { Controller, useFormContext } from "react-hook-form";
import { Editor } from ".";
import { FieldWrapper } from "../field-wrapper";

type EditorFieldProps = {
  label: string;
  name: string;
  containerClassName?: string;
  required?: boolean;
};

export const EditorField: React.FC<EditorFieldProps> = ({
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
          <Editor {...field} {...props} />
        </FieldWrapper>
      )}
    />
  );
};
