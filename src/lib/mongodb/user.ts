import { compare as bcryptjsCompare, hash } from "bcryptjs";

import clientPromise from "./clientPromise";
import { User, UserRoleType } from "@/types/user";

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

async function signup(username: string, password: string, email: string, role: UserRoleType) {
  const hashedPassword = await hash(password, 10);
  const now = new Date();

  try {
    const client = await clientPromise;
    const db = client.db("user");

    const duplicatedUser = await db.collection("home").find({ username }).next();
    if (duplicatedUser) return { status: false, message: `Username ${username} has been used` };

    const result = await db
      .collection("home")
      .insertOne({ username, password: hashedPassword, email, role, create_time: now, update_time: now });

    if (result.insertedId) return { status: true, message: "Signup succeeded" };
    else return { status: false, message: "Failed to signup" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

const user = {
  compare,
  signup,
};

export default user;
