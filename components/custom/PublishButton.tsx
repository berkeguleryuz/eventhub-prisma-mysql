"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PublishButtonProps {
  disabled: boolean;
  courseId: string;
  sectionId: string;
  isPublished: boolean;
  page: string;
}

const PublishButton = ({
  disabled,
  courseId,
  sectionId,
  isPublished,
  page,
}: PublishButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    let url = `/api/courses/${courseId}`;
    if (page === "Section") {
      url += `/sections/${sectionId}`;
    }

    try {
      setIsLoading(true);
      isPublished
        ? await axios.post(`${url}/unpublish`)
        : axios.post(`${url}/publish`);

      toast.success(`${page} ${isPublished ? "unpublished" : "published"}`);
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(
        `Failed to ${isPublished} ? "unpublish" : "publish") ${page}`,
        err,
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant={"outline"}
      disabled={disabled || isLoading}
      onClick={onClick}>
      {isLoading ? <Loader2 /> : isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};

export default PublishButton;
