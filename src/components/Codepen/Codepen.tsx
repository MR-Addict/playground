import Script from "next/script";

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
    <section aria-label='codepen iframe' style={{ height }} className='relative w-full my-4'>
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
