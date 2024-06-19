"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

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
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(
        `Failed to ${isPublished} ? "unpublish" : "publish") ${page}`,
        err,
      );
    }
  };
  return (
    <Button>
      {isLoading ? <Loader2 /> : isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};

export default PublishButton;
