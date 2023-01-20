import clientPromise from "./clientPromise";

async function insert(feedback: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("feedback").insertOne({ feedback, create_time: new Date() });
    if (result.acknowledged) return { status: true, message: "Insert success!" };
    else return { status: false, message: "Insert failed!" };
  } catch (error) {
    return { status: false, message: "Communicate to mongodb failed!" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db
      .collection("feedback")
      .find({})
      .sort({ create_time: -1 })
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Communicate to mongodb failed!" };
  }
}

const feedbcak = {
  insert,
  read,
};

export default feedbcak;
