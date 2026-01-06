"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Materia } from "@/prisma/generated/prisma/client";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import getActivities, { removeActivity } from "../query/action";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Session } from "better-auth";
import { Button } from "@/components/ui/button";
import { Loader2, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActivityList({
  activity,
  materia,
  session,
}: {
  activity: Activity[];
  materia: Materia;
  session: Session | null;
}) {
  const [offset, setOffset] = useState(4);
  const [activities, setActivities] = useState<Activity[]>(activity);
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [stop, setStop] = useState(false);

  const loadMoreActivities = async () => {
    const apiActivities = await getActivities(materia, offset, 4);
    if (apiActivities.length === 0) setStop(true);
    setActivities((activities) => [...activities, ...apiActivities]);
    setOffset((offset) => offset + 4);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && !stop) {
      (async () => {
        setIsLoading(true);
        await loadMoreActivities();
      })();
    }
  }, [inView]);

  return (
    <>
      <div className="flex flex-col items-center w-full space-y-5">
        {activities.map((e) => (
          <ActivityCard
            name={e.name}
            description={e.description}
            id={e.id}
            session={session}
            key={e.id}
          ></ActivityCard>
        ))}
        <div ref={ref}></div>
        {isLoading && <Spinner />}
      </div>
    </>
  );
}

function ActivityCard({
  name,
  description,
  id,
  session,
}: {
  name: string;
  description: string;
  id: string;
  session: Session | null;
}) {
  const [isTransitionStarted, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const isMutating = isTransitionStarted || isLoading;
  const router = useRouter();
  return (
    <Card className="w-1/2 md:w-1/5 pt-0">
      <CardContent className="px-0"></CardContent>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="gap-3 max-sm:flex-col flex md:justify-end">
        {session != null && (
          <Button
            variant={"destructive"}
            disabled={isMutating}
            aria-disabled={isMutating}
            onClick={async () => {
              setIsLoading(true);
              await removeActivity(id);
              startTransition(router.refresh);
              setIsLoading(false);
            }}
          >
            {isMutating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
          </Button>
        )}
        <Link
          href={"/materias/atividades/detail/" + id}
          className="bg-primary text-secondary rounded-lg p-2"
        >
          Ver detalhes
        </Link>
      </CardFooter>
    </Card>
  );
}
