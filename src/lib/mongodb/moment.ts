import z from "zod";
import { ObjectId } from "mongodb";

import clientPromise from "./clientPromise";
import { Moment } from "@/types/moment";

async function insert(moment: string, weather: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("moment");

    const result = await collection.insertOne({ moment, weather, date: new Date() });
    if (result.insertedId) return { status: true, message: "Insert succeeded" };
    else return { status: false, message: "Insert failed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function update(_id: string, moment: string, weather: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("moment");

    const result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { moment, weather } });
    if (result.modifiedCount) return { status: true, message: "Update succeeded" };
    else return { status: true, message: "Nothing changed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("moment");

    const result = await collection.find({}).sort({ date: -1 }).toArray();
    const moments = z.array(Moment).parse(result);
    return { status: true, data: moments };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function remove(_id: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("moment");

    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    if (result.deletedCount > 0) return { status: true, message: "Delete succeeded" };
    else return { status: false, message: "Delete failed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Cannot establish connection with mongodb" };
  }
}

const moment = {
  insert,
  update,
  read,
  remove,
};

export default moment;
