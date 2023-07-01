import style from "./Youtube.module.css";

export default function Youtubes({ id }: { id: string }) {
  return (
    <section aria-label="youtube video iframe" className={style.container}>
      <iframe
        allowFullScreen
        title="Youtube player"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="absolute top-0 left-0 w-full h-full rounded-md"
      ></iframe>
    </section>
  );
}
