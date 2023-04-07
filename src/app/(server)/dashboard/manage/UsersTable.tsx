import style from "./UsersTable.module.css";
import { formatDate } from "@/lib/utils";
import { UserType } from "@/types/user";
import { DeleteButton, RoleButton } from "./components";

export default function UsersTable({ users }: { users: UserType[] }) {
  return (
    <section aria-label='users table' className='w-full overflow-x-auto bg-white rounded-md shadow-lg'>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Create Time</th>
            <th>Update Time</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id.toString()}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.create_time)}</td>
              <td>{formatDate(user.update_time)}</td>
              <td className='flex flex-row gap-1 items-center'>
                <RoleButton _id={user._id.toString()} role={user.role} />
                <DeleteButton _id={user._id.toString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
