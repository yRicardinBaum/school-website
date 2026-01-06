import { getActivity } from "../../../query/action";

export default async function AtivitiesPage({
  params,
}: {
  params: Promise<{ activities: string }>;
}) {
  const activity = await getActivity((await params).activities);
  if (activity)
    return (
      <>
        <main className="max-w-3xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-4">{activity.name}</h1>

          <p className="text-sm text-gray-500 mb-6">
            Matéria: {activity.materia} • Entrega em{" "}
            {new Date(activity.createdAt).toLocaleDateString("pt-BR")}
          </p>

          <article className="prose prose-neutral">
            {activity.description}
          </article>
        </main>
      </>
    );

  return <></>;
}
