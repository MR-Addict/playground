export default function Codepen({
  id,
  height,
  author = "MR-Addict",
  theme = "dark",
  editable = false,
}: {
  id: string;
  height: string;
  author?: string;
  theme?: string;
  editable?: boolean;
}) {
  return (
    <section aria-label='codepen iframe' style={{ height }} className='relative w-full my-4'>
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
