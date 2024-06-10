import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CoursesPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="px-6 py-4 ">
      <Link href={"/instructor/create-course"}>
        <Button>Create New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
