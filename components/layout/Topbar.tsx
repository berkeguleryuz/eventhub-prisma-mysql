"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
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
      </div>

      {isSignedIn ? (
        <UserButton afterSignOutUrl="/sign-in" />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default Topbar;
