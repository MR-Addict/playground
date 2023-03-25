"use client";

import style from "./component.module.css";

interface Props {
  isOpenForm: boolean;
  setIsOpenForm: Function;
  handleClick: Function;
}

export default function DeletePopup({ isOpenForm, setIsOpenForm, handleClick }: Props) {
  return (
    <section
      aria-label='moment form'
      className={[style.frame, "frame", isOpenForm ? "scale-100" : "scale-0"].join(" ")}
    >
      <div className={[style.popup, "background", isOpenForm ? "scale-100" : "scale-0"].join(" ")}>
        <h1 className='font-bold text-3xl text-center text-gray-700'>Delete Moment?</h1>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => {
              setIsOpenForm(false);
              document.body.style.overflow = "auto";
            }}
            className='w-full py-2 rounded-sm background border border-black duration-300 hover:shadow-md'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => handleClick()}
            className='w-full py-2 rounded-sm border border-black duration-300 bg-green-600 hover:bg-green-700 text-white'
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
