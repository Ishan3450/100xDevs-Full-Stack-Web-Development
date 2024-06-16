import React from "react";

function InputBox({ label, placeholder, type, onChange }) {
  return (
    <div className="mt-2">
      <div className="font-medium text-sm">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1 text-sm text-black"
        onChange={onChange}
      />
    </div>
  );
}

export default InputBox;
