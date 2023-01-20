import clientPromise from "./clientPromise";

async function revalidateFeedbackPage() {
  const backendUrl = process.env.VERCEL ? "https://" + process.env.VERCEL_URL + "/" : "http://localhost:3000/";

  await fetch(`${backendUrl}api/app/revalidate`, {
    method: "POST",
    body: new URLSearchParams({ token: process.env.REVALIDATE_TOKEN || "", path: "/feedback" }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) console.error(result.message);
    })
    .catch((error) => console.error(error));
}

async function insert(feedback: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("feedback").insertOne({ date: new Date().toISOString(), message: feedback });
    if (result.acknowledged) {
      await revalidateFeedbackPage();
      return { status: true, message: "Insert success!" };
    } else return { status: false, message: "Insert failed!" };
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
