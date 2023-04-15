import z from "zod";
import { ObjectId } from "mongodb";

import clientPromise from "./clientPromise";
import { DatabaseProject, DatabaseProjectType } from "@/types/project";

async function insert(owner: string, name: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("project");

    const count = await collection.countDocuments();
    const result = await collection.insertOne({ owner, name, index: count });
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

async function reorder(projects: DatabaseProjectType[]) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("project");

    const promises = projects.map((project) =>
      collection.updateOne({ _id: new ObjectId(project._id) }, { $set: { index: project.index } })
    );
    await Promise.all(promises);
    return { status: true, message: "Reorder succeeded" };
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
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();
    const data = z.array(DatabaseProject).parse(result);
    return { status: true, data };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error occurred while communicate with mongodb" };
  }
}

async function remove(project: DatabaseProjectType) {
  try {
    const client = await clientPromise;
    const collection = client.db("playground").collection("project");

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(project._id) });
    const reorderResult = await collection.updateMany({ index: { $gt: project.index } }, { $inc: { index: -1 } });
    if (deleteResult.deletedCount > 0 && reorderResult.acknowledged)
      return { status: true, message: "Delete succeeded" };
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
  reorder,
};

export default project;
