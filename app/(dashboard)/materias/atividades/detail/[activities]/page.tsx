import { notFound } from "next/navigation";
import { getActivity } from "../../../query/action";
import DownloadButton from "./component/download-button";

export default async function AtivitiesPage({
  params,
}: {
  params: Promise<{ activities: string }>;
}) {
  const activity = await getActivity((await params).activities);

  if (activity) {
    const files = activity?.files.split(",");
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

          <div className="pt-5">
            {files.length > 0 &&
              files.map((f) => (
                <DownloadButton key={f} filename={f} id={activity.id} />
              ))}
          </div>
        </main>
      </>
    );
  } else return notFound();
}
