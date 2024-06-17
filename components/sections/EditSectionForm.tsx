"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Trash } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MuxData, Resource, Section } from "@prisma/client";
import RichEditor from "@/components/custom/RichEditor";
import FileUpload from "@/components/custom/FileUpload";
import ResourceForm from "./ResourceForm";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters long.",
  }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().optional(),
});

interface EditSectionFormProps {
  section: Section & { resources: Resource[]; muxData?: MuxData | null };
  courseId: string;
  isCompleted: boolean;
}

const EditSectionForm = ({
  section,
  courseId,
  isCompleted,
}: EditSectionFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      description: section.description || "",
      videoUrl: section.videoUrl || "",
      isFree: section.isFree,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated!");
      router.refresh();
    } catch (err) {
      console.log("Failed to update new course", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between mb-7 mt-6">
        <Link href={`/instructor/courses/${courseId}/sections`}>
          <Button
            variant={"outline"}
            className="text-sm font-medium hover:bg-[#FDAB04]/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to curriculum
          </Button>
        </Link>

        <div className="flex gap-4 items-start">
          <Button variant={"outline"}>Publish</Button>
          <Button>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <h1 className="text-xl font-bold">Section Details</h1>
      <p className="text-sm font-medium mt-2">
        Complete this section with detailed information, good video and
        resources that give you an edge. The students will be learning that from
        this section.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Introduction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="What is this section about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="sectionVideo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Accessibility</FormLabel>
                  <FormDescription>
                    Everyone can access this section for FREE.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Link href={`/instructor/courses/${courseId}/sections`}>
              <Button
                variant={"outline"}
                type="button"
                className="hover:bg-[#FDAB04]/10">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-[#FDAB04] hover:bg-[#FDAB04]/80">
              Save
            </Button>
          </div>
        </form>
      </Form>

      <ResourceForm section={section} courseId={courseId} />
    </div>
  );
};

export default EditSectionForm;
