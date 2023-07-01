import { SiHtml5 } from "react-icons/si";
import { IconType } from "react-icons/lib";
import { FaUnlockAlt } from "react-icons/fa";
import { BsShieldLockFill, BsCameraFill } from "react-icons/bs";

const tools: {
  name: string;
  icon: IconType;
  link: string;
  intro: string;
}[] = [
  {
    name: "Password Generator",
    icon: FaUnlockAlt,
    link: "/tools/password-generator",
    intro:
      "Don't you think it hard to come up with a difficult password. As a tech gay, we should automatic it. This programme help you generate passwords eaisly but also with multi options."
  },
  {
    name: "Bcrypt",
    icon: BsShieldLockFill,
    link: "/tools/bcrypt",
    intro:
      "Bcrypt uses the blowfish cipher combined with random salt to hash the password. Make sure your password is hard to crack. This program helps you hash your password with bcrypt."
  },
  {
    name: "Capture Website",
    icon: BsCameraFill,
    link: "/tools/capture-website",
    intro:
      "Capture any websites from url. You can specific many options for your own needs, you can even use my api if you want to implement it into your own app."
  },
  {
    name: "HTML Playground",
    icon: SiHtml5,
    link: "/tools/html-playground",
    intro:
      "Simple HTML, CSS and Javascript playground. Live coding, live reloading, syntax highlight and autocomplete. It helps you write HTML code without creating any html files locally."
  }
];

export default tools;
