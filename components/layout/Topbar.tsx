"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BarChart4, Menu, MonitorPlay, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
  ];

  const sidebarRoutes = [
    { label: "Courses", path: "/instructor/courses" },
    {
      label: "Performance",
      path: "/instructor/performance",
    },
  ];

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };
  return (
    <div className="flex justify-between items-center p-4">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={100} height={100} />
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-[#FFF8ED] rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#FDAB04] rounded-r-full border-none outline-none px-4 py-3 hover:bg-[#FDAB04]/80 cursor-pointer"
          disabled={searchInput.trim() === ""}
          onClick={handleSearch}>
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-[#FDAB04]">
              {route.label}
            </Link>
          ))}
        </div>

        <div className="w-full max-w-[200px] z-20 sm:hidden">
          <Sheet>
            <SheetTrigger className="items-center text-center flex">
              <Menu className="w-5 h-5" />
            </SheetTrigger>

            <SheetContent className="flex flex-col gap-4">
              <Link href={"/"}>
                <Image src={"/logo.png"} alt="logo" width={100} height={100} />
              </Link>
              <div className="flex flex-col gap-4">
                {topRoutes.map((route) => (
                  <SheetClose key={route.path} asChild>
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#FDAB04]">
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {pathname.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <SheetClose key={route.path} asChild>
                      <Link
                        href={route.path}
                        key={route.path}
                        className="text-sm font-medium hover:text-[#FDAB04]">
                        {route.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
