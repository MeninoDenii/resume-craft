import { Controller, useFormContext } from "react-hook-form";
import { Switch } from ".";

type SwitchFieldProps = {
  name: string;
  className?: string;
};

export const SwitchField: React.FC<SwitchFieldProps> = ({ name, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          {...field}
          {...props}
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
};
