import { ObjectId } from "mongodb";

import clientPromise from "./clientPromise";

async function insert(moment: string, weather: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("moments").insertOne({ date: new Date().toISOString(), moment, weather });
    if (result.insertedId) return { status: true, message: "Insert succeeded!" };
    else return { status: false, message: "Insert failed!" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function update(_id: string, moment: string, weather: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("moments").updateOne({ _id: new ObjectId(_id) }, { $set: { moment, weather } });
    if (result.modifiedCount) return { status: true, message: "Update succeeded!" };
    else return { status: false, message: "Update failed!" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result: any[] = await db
      .collection("moments")
      .find({})
      .sort({ date: -1 })
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

const moments = {
  insert,
  update,
  read,
};

export default moments;
