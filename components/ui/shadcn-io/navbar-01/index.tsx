"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { authClient } from "@/auth/client";
import { useRouter } from "next/navigation";

export const Navbar = ({ user }: { user: User | undefined | null }) => {
  return (
    <header
      className={
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 **:no-underline"
      }
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <div className="text-2xl">
                <Image
                  alt="sesi_logo"
                  src={"/logo-sesi.png"}
                  width={100}
                  height={100}
                ></Image>
              </div>
              <span className="hidden font-bold text-xl sm:inline-block text-black">
                Ricardo Marinho
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                id="subjects_button"
                variant="ghost"
                size="sm"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Matérias <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minhas matérias</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/materias?subject=linguagens"}>Linguagens</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/materias?subject=matematica"}>Matemática</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/materias?subject=cienciasnatureza"}>
                  Ciência da natureza
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/materias?subject=cienciashumanas"}>
                  Ciências humanas
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <>
              <UserMenu userEmail={user.email} userName={user.name}></UserMenu>
            </>
          ) : (
            <>
              <Link
                href={"/auth/signin"}
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2 pl-3 pr-3 rounded-md bg-primary text-white delay-50 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const UserMenu = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
  onItemClick,
}: {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onItemClick?: (item: string) => void;
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="avatar_button"
          variant="ghost"
          className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="text-xs">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="h-3 w-3 ml-1" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            await authClient.signOut();
            router.refresh();
          }}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
