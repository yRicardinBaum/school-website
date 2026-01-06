import { notFound } from "next/navigation";
import getActivities from "./query/action";
import { Materia } from "@/prisma/generated/prisma/enums";
import ActivityList from "./component/activity-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderArchiveIcon } from "lucide-react";
import Link from "next/link";
import ActivityCreate from "./component/activity-create";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { Session } from "better-auth";

export default async function MateriasPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const materia = (await searchParams)?.subject?.toString();
  const materiaEnum = Materia[materia!.toUpperCase() as keyof typeof Materia];
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (materia && materiaEnum) {
    const initialActivities = await getActivities(materiaEnum, 0, 4);
    return (
      <>
        {/*<Link href={`/materias/atividades/create`}>Voltar</Link>*/}
        {session?.session && <ActivityCreate />}
        <h1 className="mt-40 flex justify-center mb-4 text-4xl font-extrabold text-blue-600 leading-none tracking-tight md:text-5xl lg:text-6xl ">
          {materia.charAt(0).toUpperCase() + materia.slice(1)}
        </h1>
        <p className="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
          Aqui irei depositar os trabalhos de linguagem
        </p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        {initialActivities.length === 0 ? (
          <>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderArchiveIcon />
                </EmptyMedia>
                <EmptyTitle>Sem atividades ainda.</EmptyTitle>
                <EmptyDescription>
                  Você não criou nenhuma atividade para essa materia.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </>
        ) : (
          <ActivityList
            session={(session?.session as Session) || null}
            activity={initialActivities}
            materia={materiaEnum}
          ></ActivityList>
        )}
      </>
    );
  } else {
    notFound();
  }
}
