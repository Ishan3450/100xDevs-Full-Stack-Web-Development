"use client";

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button className="text-white bg-black p-2 rounded-lg" onClick={onClick} type="button">
      {children}
    </button>
  );
};
