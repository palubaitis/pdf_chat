import { useField } from "remix-validated-form";
import RenderInput from "./RenderInput";

type InputProps = {
  name: string;
  label: string;
  type: "text" | "password" | "email" | "number";
  placeholder?: string;
  required?: boolean;
};

export default function Input({
  name,
  label,
  type,
  placeholder = "",
  required = false,
}: InputProps) {
  const { error, getInputProps } = useField(name);
  return (
    <div className="gap-5 max-[700px]:!block max-[700px]:!w-full">
      <label
        htmlFor={name}
        className="block mb-1 text-left font-medium text-gray-900"
      >
        {label}
      </label>
      <RenderInput
        getInputProps={getInputProps}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      {error && <div className="pt-1 text-left text-red-700">{error}</div>}
    </div>
  );
}
