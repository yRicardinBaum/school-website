import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
