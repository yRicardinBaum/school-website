import { Navbar } from "@/components/ui/shadcn-io/navbar-01";
import "../globals.css";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <main>
      <Navbar user={data?.user}></Navbar>
      {children}
    </main>
  );
}
