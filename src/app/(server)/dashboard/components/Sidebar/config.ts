import { IconType } from "react-icons/lib";
import { AiOutlineUser, AiOutlineDashboard } from "react-icons/ai";

import { UserRoleType } from "@/types/user";

interface Props {
  name: string;
  path: string;
  visibility: UserRoleType | "current";
  icon: IconType;
}

export const links: Props[] = [
  {
    name: "Account",
    path: "/dashboard",
    visibility: "current",
    icon: AiOutlineUser,
  },
  {
    name: "Manage",
    path: "/dashboard/manage",
    visibility: "admin",
    icon: AiOutlineDashboard,
  },
];
