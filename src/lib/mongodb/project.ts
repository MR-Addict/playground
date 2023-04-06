import z from "zod";
import { ObjectId } from "mongodb";

import clientPromise from "./clientPromise";
import { DatabaseProject } from "@/types/project";

async function insert(owner: string, name: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("project");

    const result = await collection.insertOne({ owner, name, index: 0 });
    if (result.insertedId) return { status: true, message: "Insert succeeded" };
    else return { status: false, message: "Insert failed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function update(_id: string, owner: string, name: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("project");

    const result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { owner, name } });
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
    const collection = client.db("playground").collection("project");

    const result = await collection
      .find({})
      .sort({ index: 1 })
      .map((item) => {
        return { ...item, _id: item._id.toString() };
      })
      .toArray();
    const data = z.array(DatabaseProject).parse(result);
    return { status: true, data };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function remove(_id: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("project");

    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    if (result.deletedCount > 0) return { status: true, message: "Delete succeeded" };
    else return { status: false, message: "Delete failed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Cannot establish connection with mongodb" };
  }
}

const project = {
  insert,
  update,
  read,
  remove,
};

export default project;
