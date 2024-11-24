import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import { ThemeProvider } from "@/features/dark-mode/theme-provider";
import fetch from "@/lib/fetchers";
import { Separator } from "@/components/ui/separator";

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

  if (!dbExist) {
    return (
      <html lang="en">
        <body>
          <main className="container mx-auto flex justify-center py-6">
            <div className="max-w-xl space-y-2 border p-6">
              <h1 className="text-2xl text-red-600">
                Error: Database failer to connect.
              </h1>
              <Separator />
              <p className="text-foreground/60">
                Provide a valid database connection uri in{" "}
                {process.env.NODE_ENV === "production" ? (
                  <>environment variables</>
                ) : (
                  <>
                    <code className="rounded bg-muted px-1 font-mono">
                      .env
                    </code>{" "}
                    file
                  </>
                )}{" "}
                and restart the server.
              </p>
            </div>
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
