import { UserRoleType } from "@/types/user";

interface Props {
  name: string;
  path: string;
  visibility: UserRoleType | "current";
}

export const links: Props[] = [
  {
    name: "Account",
    path: "/dashboard",
    visibility: "current",
  },
  {
    name: "Notification",
    path: "/dashboard/notification",
    visibility: "admin",
  },
];
