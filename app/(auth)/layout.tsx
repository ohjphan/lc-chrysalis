export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-sidebar dark:bg-background">
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
