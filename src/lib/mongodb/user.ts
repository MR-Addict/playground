import { compare as bcryptjsCompare } from "bcryptjs";

import { User } from "@/types/user";
import clientPromise from "./clientPromise";

async function compare(username: string, password: string) {
  try {
    const client = await clientPromise;
    const db = client.db("user");

    const user = await db.collection("home").find({ username }).next();
    if (!user) return { status: false, message: "User not exists" };

    const isMatched = await bcryptjsCompare(password, user.password);
    if (!isMatched) return { status: false, message: "Password incorrect" };

    const parsedUser = User.parse(user);
    return { status: true, user: parsedUser };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

const user = {
  compare,
};

export default user;
