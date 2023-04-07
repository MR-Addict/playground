import { ObjectId } from "mongodb";
import { compare as bcryptjsCompare, hash } from "bcryptjs";

import clientPromise from "./clientPromise";
import { User, UserRoleType } from "@/types/user";

async function compare(email: string, password: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("user").collection("home");

    const user = await collection.find({ email }).next();
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

async function signup(password: string, email: string, role: UserRoleType) {
  const hashedPassword = await hash(password, 10);
  const now = new Date();

  try {
    const client = await clientPromise;
    const collection = client.db("user").collection("home");

    const duplicatedUser = await collection.find({ email }).next();
    if (duplicatedUser) return { status: false, message: `Email ${email} has been used` };

    const result = await collection.insertOne({
      username: email.split("@")[0],
      password: hashedPassword,
      email,
      role,
      create_time: now,
      update_time: now,
    });

    if (result.insertedId) return { status: true, message: "Signup succeeded" };
    else return { status: false, message: "Failed to signup" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function update(_id: string, data: { username?: string; email?: string; role?: UserRoleType }) {
  try {
    const client = await clientPromise;
    const collection = client.db("user").collection("home");

    if (data.email) {
      const duplicatedUser = await collection.find({ email: data.email }).next();
      if (duplicatedUser?._id.toString() !== _id)
        return { status: false, message: `Email ${data.email} has been used` };
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...JSON.parse(JSON.stringify(data)), update_time: new Date() } }
    );
    if (result.modifiedCount) return { status: true, message: "Update succeeded" };
    else return { status: true, message: "Nothing changed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

const user = {
  compare,
  signup,
  update,
};

export default user;
