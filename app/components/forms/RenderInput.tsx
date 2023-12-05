import { useState } from "react";
import PasswordEye from "./PasswordEye";

type RenderInputProps = {
  name: string;
  type: "number" | "password" | "email" | "text";
  required?: boolean;
  placeholder?: string;
  getInputProps: any;
};

export default function RenderInput({
  name,
  type,
  required = false,
  placeholder,
  getInputProps,
}: RenderInputProps) {
  const props = {
    required,
    ...getInputProps({ id: name }),
    placeholder,
    type,
    className:
      "bg-gray-50 border border-opacity-80 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-100",
  };

  switch (type) {
    case "number":
    case "email":
    case "text":
      return <input {...props} />;
    case "password":
      const [passwordShown, setPasswordShown] = useState(false);
      return (
        <div className="flex">
          <input {...props} type={passwordShown ? "text" : "password"} />
          <PasswordEye
            passwordShown={passwordShown}
            setPasswordShown={setPasswordShown}
          />
        </div>
      );
  }
}
