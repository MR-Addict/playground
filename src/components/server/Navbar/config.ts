import { UserRoleType } from "@/types/user";

interface Props {
  title: string;
  link: string;
  visibility: UserRoleType;
}

const navbarData: Props[] = [
  {
    title: "Home",
    link: "/",
    visibility: "vistor",
  },
  {
    title: "Blog",
    link: "/blog",
    visibility: "vistor",
  },
  {
    title: "Tools",
    link: "/tools",
    visibility: "vistor",
  },
  {
    title: "Chat",
    link: "/chat",
    visibility: "contributor",
  },
  {
    title: "Moments",
    link: "/moments",
    visibility: "admin",
  },
];

export default navbarData;
