"use client";

import { getSession } from "@/lib/auth/auth";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase />
          <span>Tracker App</span>
        </Link>
        <Suspense fallback={<div className="h-9 w-40" />}>
          <NavbarAuth />
        </Suspense>
      </div>
    </nav>
  );
};

const NavbarAuth = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-gray-700 hover:text-black"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          Dashboard
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative size-8 rounded-full"
              />
            }
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white">
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-black"
        nativeButton={false}
        render={<Link href="/sign-in" />}
      >
        Log In
      </Button>
      <Button
        className="bg-primary hover:bg-primary/90"
        nativeButton={false}
        render={<Link href="/sign-up" />}
      >
        Start for free
      </Button>
    </div>
  );
};

export default Navbar;
