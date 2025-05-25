import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { SocketProvider } from "@/contenxt/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard built with Next.js and Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SocketProvider>
            <AuthProvider>
              <ReduxProvider>{children}</ReduxProvider>
              <Toaster />
            </AuthProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
