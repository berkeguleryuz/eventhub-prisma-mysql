import { Course, Section } from "@prisma/client";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

const SectionMenu = ({
  course,
}: {
  course: Course & { sections: Section[] };
}) => {
  return (
    <div className="w-full max-w-[200px] z-20 md:hidden">
      <Sheet>
        <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#FDAB04] text-black shadow hover:bg-[#FDAB04]/90 h-9 px-4 py-2">
          Sections
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetClose asChild>
            <Link
              href={`/courses/${course.id}/overview`}
              className="p-3 rounded-lg hover:bg-[#FFF8EB] mt-4">
              Overview
            </Link>
          </SheetClose>

          {course.sections.map((section) => (
            <SheetClose key={section.id} asChild>
              <Link
                key={section.id}
                href={`/courses/${course.id}/sections/${section.id}`}
                className="p-3 rounded-lg hover:bg-[#FFF8EB] mt-4">
                {section.title}
              </Link>
            </SheetClose>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SectionMenu;
