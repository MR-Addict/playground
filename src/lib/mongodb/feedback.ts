import z from "zod";

import clientPromise from "./clientPromise";
import { Feedback } from "@/types/feedback";

async function insert(feedback: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("feedback");

    const result = await collection.insertOne({ date: new Date(), feedback });
    if (result.acknowledged) return { status: true, message: "Insert succeeded" };
    else return { status: false, message: "Insert failed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("feedback");

    const result = await collection.find({}).sort({ date: -1 }).toArray();
    const feedbacks = z.array(Feedback).parse(result);

    return { status: true, data: feedbacks };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

const feedbcak = {
  insert,
  read
};

export default feedbcak;
