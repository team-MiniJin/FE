interface InputProps {
  placeholder: string;
  type?: string;
}

function Input({ placeholder, type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 w-full rounded-md border border-gray-300 px-4 py-2"
    />
  );
}

export default Input;
