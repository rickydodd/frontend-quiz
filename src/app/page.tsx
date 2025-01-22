
export default function Home() {

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
      </main>
    </>
  );
}
