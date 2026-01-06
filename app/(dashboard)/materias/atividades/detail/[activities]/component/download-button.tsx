"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DownloadButton({
  id,
  filename,
}: {
  id: string;
  filename: string;
}) {
  return (
    <>
      <Button
        variant={"outline"}
        role="button"
        aria-label={`Baixar arquivo ${filename}`}
        className="border bg-gray-100 w-fit p-3 rounded-2xl cursor-pointertransition hover:bg-gray-200active:scale-[0.97]focus:outline-nonefocus:ring-2 focus:ring-gray-300 cursor-pointer"
        onClick={async () => {
          const newWindow = window.open(
            env.NEXT_PUBLIC_S3_URL + "/" + id + "/" + filename,
            "_blank",
            "noopener,noreferrer"
          );
          if (newWindow) newWindow.opener = null;
        }}
      >
        <div className="flex items-center space-x-3">
          <p className="text-sm font-medium text-gray-800 truncate max-w-40">
            {filename}
          </p>
          <DownloadIcon
            size={15}
            className="text-gray-600 transition-transform group-hover:translate-y-px"
          />
        </div>
      </Button>
    </>
  );
}
