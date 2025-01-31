import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";

import { Quiz } from "@/app/types";
import QuizForm from "@/app/components/quizForm";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const file = await fs.readFile(
    path.join(process.cwd(), "src/app/data.json"),
    "utf8",
  );
  const data = JSON.parse(file);
  const slug = (await params).slug;

  const quiz = data.quizzes.find(
    (quiz: Quiz) => quiz.title.toLowerCase() === slug,
  );

  if (!quiz) notFound();

  return (
    <>
      <header className="relative z-10">
        <div className="mx-6 mt-4 flex items-center gap-4">
          <div className="w-10 rounded-md" style={{ background: quiz.color }}>
            <img
              src={quiz.icon.substring(1)}
              alt={`${quiz.title} icon`}
              className="p-1"
            />
          </div>
          <h1 className="text-md font-medium">{quiz.title}</h1>
        </div>
      </header>
      <div
        aria-hidden="true"
        className="absolute top-0 z-0 h-screen w-screen bg-background-pattern bg-no-repeat"
      ></div>
      <main className="relative z-10 mx-6 mt-12">
        <QuizForm quiz={quiz} />
      </main>
    </>
  );
}
