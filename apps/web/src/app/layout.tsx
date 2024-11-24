import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import { ThemeProvider } from "@/features/dark-mode/theme-provider";
import SetupAdminForm from "./_parts/SetupAdminForm";
import fetch from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "SuperPress",
  description: "",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dbExist = await fetch.check.checkDatabaseConnection();
  const adminExist = await fetch.check.checkSiteAdmin();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {dbExist ? (
            adminExist ? (
              <>{children}</>
            ) : (
              <main className="container mx-auto py-4">
                <SetupAdminForm />
              </main>
            )
          ) : (
            <main className="container mx-auto flex h-screen items-center justify-center p-4">
              <div className="max-w-xl">
                <h1 className="text-2xl text-red-600">
                  Database connection failed.
                </h1>
                <p className="text-foreground/60">
                  Provide a valid database connection url in{" "}
                  <code className="font-mono">.env</code> file and restart the
                  server.
                </p>
              </div>
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
