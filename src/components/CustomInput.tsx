import { Input, InputProps } from "@nextui-org/react";

interface CustomInputProps extends InputProps {
  onSave?: () => void;
}
const CustomInput = (props: CustomInputProps) => {
  return <Input label="Email" placeholder="Enter your email" {...props} />;
};
export default CustomInput;
