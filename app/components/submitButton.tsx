type ButtonProps = {
  label: string;
};

export default function SubmitButton({ label }: ButtonProps) {
  return (
    <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all border border-transparent rounded-md shadow-sm focus:outline-none bg-primary">
      {label}
    </button>
  );
}
