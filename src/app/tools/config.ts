import { IconType } from "react-icons/lib";
import { BsShieldLockFill } from "react-icons/bs";

export const colorfulColors = ["#39B5E0", "#A555EC", "#7DCE13", "#FFC93C", "#F49D1A", "#205295", "#439A97", "#68B984"];

const tools: {
  name: string;
  icon: IconType;
  intro: string;
}[] = [
  {
    name: "Bcrypt",
    icon: BsShieldLockFill,
    intro:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae a molestias minima! Ea distinctio, soluta ex ut iure blanditiis ad.",
  },
];

export default tools;
