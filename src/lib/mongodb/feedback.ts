import clientPromise from "./clientPromise";

async function insert(message: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("feedback").insertOne({ date: new Date().toISOString(), message });
    if (result.acknowledged) return { status: true, message: "Insert succeeded!" };
    else return { status: false, message: "Insert failed!" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result: any[] = await db
      .collection("feedback")
      .find({})
      .sort({ date: -1 })
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

const feedbcak = {
  insert,
  read,
};

export default feedbcak;
