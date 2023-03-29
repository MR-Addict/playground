"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./MomentForm.module.css";
import { allWeathers } from "../../config";
import { LoadingDots, OperationWindow } from "@/components";
import { usePopupContext } from "@/contexts";
import { useMomentContext } from "./MomentContextProvider";

export default function MomentForm({ isOpenForm }: { isOpenForm: boolean }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { moment, isInsertMode, setMoment, openMomentForm } = useMomentContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const backupFormData = {
      ...(isInsertMode ? {} : { _id: moment._id }),
      ...{ weather: moment.weather, moment: moment.moment },
    };

    fetch(isInsertMode ? "/api/moment/insert" : "/api/moment/update", {
      method: isInsertMode ? "POST" : "PUT",
      body: new URLSearchParams(backupFormData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
        if (result.status) openMomentForm(false);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to insert moment" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <OperationWindow isOpenWindow={isOpenForm}>
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
              className={[style.input, "h-48", "background"].join(" ")}
            />
          </div>
        </div>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => openMomentForm(false)}
            className='w-full py-2 rounded-sm background border border-black duration-300 hover:shadow-md'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={moment.moment === "" || moment.weather === "" || isSubmitting}
            className={[style.submitbtn, "bg-green-600"].join(" ")}
          >
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>{isInsertMode ? "Submit" : "Update"}</span>}
          </button>
        </div>
      </form>
    </OperationWindow>
  );
}
