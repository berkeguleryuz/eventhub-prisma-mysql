import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="px-6 py-4 ">
      <Link href={"/instructor/create-course"}>
        <Button>Create New Course</Button>
      </Link>
      <div className="mt-10">
        {courses.map((course) => (
          <Link href={`/instructor/courses/${course.id}/basic`} key={course.id}>
            {course.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
