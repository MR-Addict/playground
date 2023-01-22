import { IconType } from "react-icons/lib";
import { FaUnlockAlt } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";

export const colorfulColors = ["#39B5E0", "#A555EC", "#7DCE13", "#FFC93C", "#F49D1A", "#205295", "#439A97", "#68B984"];

const tools: {
  name: string;
  icon: IconType;
  link: string;
  intro: string;
}[] = [
  {
    name: "Password Generator",
    icon: FaUnlockAlt,
    link: "/tools/bcrypt",
    intro:
      "Don't you think it hard to come up with a difficult password. As a tech gay, we should automatic it. This programme help you generate passwords eaisly but also with multi options.",
  },
  {
    name: "Bcrypt",
    icon: BsShieldLockFill,
    link: "/tools/bcrypt",
    intro:
      "Bcrypt use the Blowfish cypher combined with random salt. It makes your password securely saved on your database. This programme helps you hash your password with bcrypt.",
  },
];

export default tools;
