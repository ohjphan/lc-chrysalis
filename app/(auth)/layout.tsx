export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f8] dark:bg-background">
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
