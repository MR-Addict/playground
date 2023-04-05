import z from "zod";
import { ObjectId } from "mongodb";

import clientPromise from "./clientPromise";
import { Project } from "@/types/project";
import { fetchOneRepo } from "../project";

async function insert(user: string, repo: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const data = await fetchOneRepo(user, repo);
    const result = await db.collection("project").insertOne(data);
    if (result.insertedId) return { status: true, message: "Insert succeeded" };
    else return { status: false, message: "Insert failed" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function update(_id: string, user: string, repo: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const data = await fetchOneRepo(user, repo);
    const result = await db.collection("project").updateOne({ _id: new ObjectId(_id) }, { $set: data });
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
    const db = client.db("playground");

    const result = await db.collection("project").find({}).sort({ lastUpdate: -1 }).toArray();
    const moments = z.array(Project).parse(result);
    return { status: true, data: moments };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function remove(_id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");
    const result = await db.collection("project").deleteOne({ _id: new ObjectId(_id) });
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
