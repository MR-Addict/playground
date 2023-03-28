import { UserRoleType } from "@/types/user";

const RolePermissions = {
  admin: 1,
  contributor: 2,
  subscriber: 3,
  vistor: 4,
};

export function checkUserPermission(user: UserRoleType, permission: UserRoleType) {
  const userPermission = RolePermissions[user];
  return userPermission <= RolePermissions[permission];
}
