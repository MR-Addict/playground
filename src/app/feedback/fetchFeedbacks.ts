import { feedback } from "@/lib/mongodb";
import { formatDate, groupBy } from "@/lib/utils";

export default async function fetchFeedbacks() {
  const result = await feedback.read();
  if (!result.data) throw new Error("Fetch data failed!");

  const mapData = result.data.map((item) => ({
    feedback: item.feedback,
    date: formatDate(item.date),
  }));

  return groupBy(mapData, (feedback) => feedback.date.split(" ")[0]);
}
