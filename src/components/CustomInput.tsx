import { Input, InputProps } from "@nextui-org/react";

interface CustomInputProps extends InputProps {
  onSave?: (val: string) => void;
  formValue?: string;
}
const CustomInput = (props: CustomInputProps) => {
  return (
    <div className="flex w-full justify-center">
      <Input
        defaultValue={props.formValue}
        className="w-[208px]"
        onValueChange={(val) => {
          props.onSave?.(val);
        }}
        label="Email"
        placeholder="Enter your email"
        {...props}
      />
    </div>
  );
};
export default CustomInput;
