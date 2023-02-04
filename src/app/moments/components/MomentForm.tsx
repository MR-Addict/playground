"use client";

import { useRouter } from "next/navigation";

import { allWeathers } from "../config";
import style from "./component.module.css";
import { usePopupContext } from "@/components";
import { useMomentContext } from "./MomentContextProvider";

export default function MomentForm() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { moment, isOpenForm, isInsertMode, setMoment, setIsOpenForm } = useMomentContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const backupFormData = {
      ...(isInsertMode ? {} : { _id: moment._id }),
      ...{ weather: moment.weather, moment: moment.moment },
    };
    if (isInsertMode) setMoment({ _id: "", date: "", weather: "", moment: "" });
    fetch(isInsertMode ? "/api/moments/insert" : "/api/moments/update", {
      method: isInsertMode ? "POST" : "PUT",
      body: new URLSearchParams(backupFormData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
        setIsOpenForm(false);
        document.body.style.overflow = "auto";
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <section
      aria-label='moment form'
      className={`${
        isOpenForm ? "scale-100" : "scale-0"
      } z-10 fixed top-0 left-0 frame w-full h-full flex flex-col items-center justify-center bg-black/40`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${
          isOpenForm ? "scale-100" : "scale-0"
        } duration-200 background w-full md:max-w-md flex flex-col gap-4 rounded-md p-5 md:p-7`}
      >
        <h1 className='font-bold text-3xl text-center text-gray-700'>Moment</h1>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='weather' className={style.label}>
              Weather
            </label>
            <select
              required
              id='weather'
              name='weather'
              value={moment.weather}
              onChange={(e) => setMoment({ ...moment, [e.target.name]: e.target.value })}
              className={[style.input, "background"].join(" ")}
            >
              <option disabled value=''>
                -- select an option --
              </option>
              {allWeathers.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='moment' className={style.label}>
              Moment
            </label>
            <textarea
              required
              id='moment'
              name='moment'
              maxLength={500}
              placeholder='Moment'
              value={moment.moment}
              onChange={(e) => setMoment({ ...moment, [e.target.name]: e.target.value })}
              className={[style.input, "h-28", "background"].join(" ")}
            />
          </div>
        </div>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => {
              setIsOpenForm(false);
              document.body.style.overflow = "auto";
            }}
            className='w-full py-2 rounded-sm background outline outline-1 hover:shadow-md'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={moment.weather === "" || moment.moment === ""}
            className='w-full py-2 rounded-sm outline outline-1 outline-black duration-300 bg-green-600 hover:bg-green-700 text-white disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
