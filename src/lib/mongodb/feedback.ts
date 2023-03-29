import z from "zod";

import clientPromise from "./clientPromise";
import { Feedback } from "@/types/feedback";

async function insert(feedback: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("feedback").insertOne({ date: new Date(), feedback });
    if (result.acknowledged) return { status: true, message: "Insert succeeded" };
    else return { status: false, message: "Insert failed" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("feedback").find({}).sort({ date: -1 }).toArray();
    const feedbacks = z.array(Feedback).parse(result);

    return { status: true, data: feedbacks };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

const feedbcak = {
  insert,
  read,
};

export default feedbcak;
