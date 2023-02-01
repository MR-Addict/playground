import Script from "next/script";
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
    <section aria-label='codepen iframe' style={{ height }} className={style.codepen}>
      <p
        className='codepen'
        data-user={author}
        data-slug-hash={id}
        data-height={height}
        data-theme-id={theme}
        data-editable={editable}
        data-default-tab='result'
      ></p>
      <Script src='/assets/codepen-embed.js' />
    </section>
  );
}
