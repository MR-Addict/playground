"use client";

import { useRouter } from "next/navigation";

import { allWeathers } from "../config";
import style from "./component.module.css";
import { usePopupContext } from "@/contexts";
import { useMomentContext, defaultMoment } from "./MomentContextProvider";

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
    if (isInsertMode) setMoment(defaultMoment);
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
        popup({ status: false, message: "Failed to insert moments!" });
        console.error(error);
      });
  }

  return (
    <section aria-label='moment form' className={[style.frame, isOpenForm ? "scale-100" : "scale-0"].join(" ")}>
      <form
        onSubmit={handleSubmit}
        className={[style.form, "background", isOpenForm ? "scale-100" : "scale-0"].join(" ")}
      >
        <h1 className='font-bold text-3xl text-gray-700 border-b-4 border-b-green-600'>Moment</h1>

        <div className='w-full flex flex-col gap-3'>
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
              maxLength={5000}
              placeholder='Write something'
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
            disabled={Object.values(moment).find((item) => item === "") !== undefined}
            className={[style.submitbtn, "bg-green-600"].join(" ")}
          >
            {isInsertMode ? "Submit" : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
}
