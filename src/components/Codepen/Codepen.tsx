import style from "./Codepen.module.css";

export default function Codepen({
  id,
  height,
  theme = "dark",
  editable = false,
  author = "MR-Addict",
}: {
  id: string;
  height: string;
  theme?: string;
  author?: string;
  editable?: boolean;
}) {
  return (
    <section aria-label='codepen iframe' style={{ height }} className={style.container}>
      <iframe
        loading='lazy'
        allowFullScreen
        title='Codepen iframe'
        className='absolute top-0 left-0 w-full h-full rounded-md'
        src={`https://codepen.io/${author}/embed/${id}?default-tab=result&editable=${editable}&theme-id=${theme}`}
      ></iframe>
    </section>
  );
}
