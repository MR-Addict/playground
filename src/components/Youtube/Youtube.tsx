export default function Youtubes({ id }: { id: string }) {
  return (
    <div className='relative aspect-video my-4'>
      <iframe
        allowFullScreen
        title='YouTube player'
        src={`https://www.youtube.com/embed/${id}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        className='absolute top-0 left-0 w-full h-full rounded-md'
      ></iframe>
    </div>
  );
}
