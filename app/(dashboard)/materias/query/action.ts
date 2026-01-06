"use server";

import aws from "@/lib/s3";
import s3client from "@/lib/s3";
import { prisma } from "@/prisma/db";
import { Materia } from "@/prisma/generated/prisma/enums";

export default async function getActivities(
  materia: Materia,
  offset: number,
  limit: number,
) {
  const materias = await prisma.activity.findMany({
    where: {
      materia: materia,
    },
    skip: offset,
    take: limit,
  });

  return materias;
}

export async function getActivity(id: string) {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

export async function createActivity(
  name: string,
  description: string,
  unity: string,
  materia: Materia,
  fileList: FileList,
) {
  const files: File[] = Array.from(fileList ?? []);
  const activity = await prisma.activity.create({
    data: {
      name,
      description,
      unity,
      materia,
      files: files.map((file) => file.name).join(","),
    },
  });
  if (files.length > 0)
    await aws.write(activity.id + "/" + files[0].name, files[0], {
      type: files[0].type,
    });

  return { success: true };
}

export async function removeActivity(id: string) {
  const remove = await prisma.activity.delete({
    where: {
      id,
    },
    select: {
      files: true,
    },
  });

  if (remove.files != "") {
    const archives = remove.files.split(",");
    for (const archive of archives) {
      await aws.delete(id + "/" + archive);
    }
  }
}
