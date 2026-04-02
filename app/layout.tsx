import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Learning Commons — Developer",
    template: "%s — Learning Commons",
  },
  description: "Learning Commons developer platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/fqb1rfc.css" />
        <style>{`
          :root {
            --font-sans-app: "parabolica-text", var(--font-inter), ui-sans-serif, system-ui, sans-serif;
            --font-parabolica-stack: "parabolica", "parabolica-text", var(--font-inter), sans-serif;
          }
        `}</style>
      </head>
      <body
        className="min-h-full bg-background font-sans text-base font-normal text-foreground antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
