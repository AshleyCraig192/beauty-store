export default function SignOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fffaf6]">
      {children}
    </div>
  );
}