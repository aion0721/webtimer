import React from "react";

interface TextBoxProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className={`w-20 px-3 py-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
    />
  );
};

export default TextBox;
