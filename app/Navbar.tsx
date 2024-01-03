"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bug } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
      {
        label: "Dashboard",
        href: "/",
      },
      {
        label: "Issues",
        href: "/issues/list",
      },
    ];

    return (
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentPath,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton className="w-[3rem]" />;

    if (status === "unauthenticated") {
      return (
        <Link className="nav-link" href="/api/auth/signin">
          Login
        </Link>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session!.user!.image!} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session!.user!.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className=" border-b mb-5 px-5 py-4">
      <nav className=" container">
        <section className="flex justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Bug />
            </Link>
            <NavLinks />
          </div>
          <div>
            <AuthStatus />
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
