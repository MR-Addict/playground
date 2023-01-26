import { IconType } from "react-icons/lib";
import { FaUnlockAlt } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";

const tools: {
  name: string;
  icon: IconType;
  link: string;
  intro: string;
}[] = [
  {
    name: "Password Generator",
    icon: FaUnlockAlt,
    link: "/tools/passwordgenerator",
    intro:
      "Don't you think it hard to come up with a difficult password. As a tech gay, we should automatic it. This programme help you generate passwords eaisly but also with multi options.",
  },
  {
    name: "Bcrypt",
    icon: BsShieldLockFill,
    link: "/tools/bcrypt",
    intro:
      "Bcrypt uses the blowfish cipher combined with random salt to hash the password. Make sure your password is hard to crack. This program helps you hash your password with bcrypt.",
  },
];

export default tools;
