"use client";
import { Course, Resource, Section } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { File, Loader2, PlusIcon, X } from "lucide-react";
import FileUpload from "@/components/custom/FileUpload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title is required and minimum 2 characters.",
  }),
  fileUrl: z.string().min(1, {
    message: "File is required.",
  }),
});

interface ResourceFormProps {
  section: Section & { resources: Resource[] };
  courseId: string;
}

const ResourceForm = ({ section, courseId }: ResourceFormProps) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 2. Define your submit function.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources`,
        values,
      );
      toast.success("New Resource uploaded!");
      form.reset();
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong!");
      console.log("Failed to upload resource", err);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources/${id}`,
      );
      toast.success("Resource deleted!!");
      form.reset();
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong!");
      console.log("Failed to delete resource", err);
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center text-xl font-bold mt-12">
        <PlusIcon />
        Add Resources (optional)
      </div>
      <p className="text-sm font-medium mt-2">
        Add resources to this section to help students learn better.
      </p>

      <div className="mt-5 flex flex-col gap-5">
        {section.resources.map((resource) => (
          <div
            key={resource.id}
            className="flex justify-between bg-[#FFF8EB] rounded-lg text-sm font-medium p-3">
            <div className="flex flex-row items-center">
              <File className="w-4 h-4 mr-4" />
              {resource.name}
              <p className="ml-1 hidden md:flex">⌁ {resource.fileUrl}</p>
            </div>
            <button
              className="text-[#FDAB04]"
              disabled={isSubmitting}
              onClick={() => onDelete(resource.id)}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filename</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your resources name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value || ""}
                      onChange={(url) => field.onChange(url)}
                      endpoint="sectionResource"
                      page="Edit Section"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResourceForm;
