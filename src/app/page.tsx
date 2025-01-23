import { promises as fs } from "fs";

type Quiz = {
  title: string;
  icon: string;
  color: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
};

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  const data = JSON.parse(file);

  return (
    <>
      <header></header>
      <main className="relative z-0 mx-6 mt-8">
        <h1 className="mb-4 text-[clamp(2.5rem,5vw+1rem,4rem)] font-thin">
          Welcome to the{" "}
          <span className="block font-medium">Frontend Quiz!</span>
        </h1>
        <p className="text-xs italic text-subtitle">
          Pick a subject to get started.
        </p>
        <nav className="mt-10 font-medium" aria-label="Quiz subjects">
          {data.quizzes.map((quiz: Quiz) => (
            <a
              href={`/${quiz.title.toLowerCase()}`}
              key={quiz.title}
              className="mt-3 flex items-center gap-4 rounded-2xl bg-option px-3 py-2"
            >
              <div
                aria-hidden="true"
                className="w-10 rounded-md"
                style={{ background: quiz.color }}
              >
                <img
                  src={quiz.icon}
                  alt={`${quiz.title} icon`}
                  className="box-border p-1"
                />
              </div>
              {quiz.title}
            </a>
          ))}
        </nav>
      </main>
    </>
  );
}
