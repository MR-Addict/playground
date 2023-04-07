import { UserRoleType } from "@/types/user";

const RolePermissions = {
  admin: 1,
  contributor: 2,
  subscriber: 3,
  vistor: 4,
};

export function checkPerm(user: UserRoleType, permission: UserRoleType | "current") {
  if (permission === "current") return true;

  const userPermission = RolePermissions[user];
  return userPermission <= RolePermissions[permission];
}
