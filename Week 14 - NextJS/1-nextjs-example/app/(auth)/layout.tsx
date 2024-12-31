export default function ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="p-2 text-center">20% off on creating an account {":)"}</div>
      {children}
    </>
  );
}
