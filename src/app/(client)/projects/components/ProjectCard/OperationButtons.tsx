import classNames from "classnames";
import { HiOutlineDotsVertical } from "react-icons/hi";

import style from "../ThreeDots.module.css";
import { EditButton, DeleteButton } from "../Buttons";
import { DatabaseProjectType } from "@/types/project";

export default function OperationButtons({ project }: { project: DatabaseProjectType }) {
  return (
    <div className={style.dots}>
      <button aria-label='three dots button' type='button' className='p-1 rounded-full'>
        <HiOutlineDotsVertical />
      </button>

      <div className={classNames(style["dots-container"], "background")}>
        <EditButton project={project} />
        <DeleteButton project={project} />
      </div>
    </div>
  );
}
