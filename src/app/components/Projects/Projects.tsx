import projects from "./config";
import { TypeAnimation, ProjectCard } from "./components";

export default function Projects() {
  return (
    <section
      aria-label="projects part"
      className="py-16 md:py-24 px-5 md:px-48 w-full flex flex-col items-center justify-center gap-10"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-gray-700">Next.js projects</h1>
      <div className="flex flex-col items-center justify-center gap-10 md:gap-28">
        <TypeAnimation />
        {projects.map((item, index) => (
          <ProjectCard key={index} project={item} isEven={(index + 1) % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
