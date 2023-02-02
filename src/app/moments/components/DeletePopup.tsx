"use client";

export default function DeletePopup({
  isOpenForm,
  setIsOpenForm,
  handleClick,
}: {
  isOpenForm: boolean;
  setIsOpenForm: Function;
  handleClick: Function;
}) {
  return (
    <section
      aria-label='moment form'
      className={`${
        isOpenForm ? "scale-100" : "scale-0"
      } z-10 fixed top-0 left-0 frame w-full h-full flex flex-col items-center justify-center bg-black/40`}
    >
      <div
        className={`${
          isOpenForm ? "scale-100" : "scale-0"
        } duration-200 w-full md:max-w-sm flex flex-col gap-4 rounded-md bg-white p-5 md:p-7`}
      >
        <h1 className='font-bold text-3xl text-center text-gray-700'>Delete Moment?</h1>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => {
              setIsOpenForm(false);
              document.body.style.overflow = "auto";
            }}
            className='w-full py-2 rounded-sm bg-white outline outline-1 hover:shadow-md'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => handleClick()}
            className='w-full py-2 rounded-sm outline outline-1 outline-black duration-300 bg-green-600 hover:bg-green-700 text-white'
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
