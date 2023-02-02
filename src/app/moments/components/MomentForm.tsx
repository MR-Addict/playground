"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./component.module.css";
import { usePopupContext } from "@/components";
import { allWeathers, MomentType } from "../config";

export default function MomentForm({
  isOpenForm,
  setIsOpenForm,
  moment,
}: {
  isOpenForm: boolean;
  setIsOpenForm: Function;
  moment?: MomentType;
}) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [formData, setFormData] = useState(
    moment ? { _id: moment._id, weather: moment.weather, moment: moment.moment } : { weather: "", moment: "" }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const backupFormData = formData;
    if (!moment) setFormData({ weather: "", moment: "" });
    fetch(moment ? "/api/moments/update" : "/api/moments/insert", {
      method: moment ? "PUT" : "POST",
      // @ts-expect-error
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
            <label htmlFor='weather' className='flex flex-row items-center gap-2 text-gray-700 font-semibold'>
              Weather
            </label>
            <select
              required
              id='weather'
              name='weather'
              value={formData.weather}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
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
            <label htmlFor='moment' className='flex flex-row items-center gap-2 text-gray-700 font-semibold'>
              Moment
            </label>
            <textarea
              required
              id='moment'
              name='moment'
              maxLength={500}
              placeholder='Moment'
              value={formData.moment}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
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
            disabled={formData.weather === "" || formData.moment === ""}
            className='w-full py-2 rounded-sm outline outline-1 outline-black duration-300 bg-green-600 hover:bg-green-700 text-white disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
