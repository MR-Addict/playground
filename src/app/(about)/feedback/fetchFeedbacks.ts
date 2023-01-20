import { feedback } from "@/lib/mongodb";
import { formatDate, groupBy } from "@/lib/utils";

export default async function fetchFeedbacks() {
  const result = await feedback.read();
  if (!result.data) throw new Error("Fetch data failed!");

  const mapData = result.data.map((item) => ({
    date: formatDate(item.date),
    message: item.message,
  }));

  return groupBy(mapData, (feedback) => feedback.date.split(" ")[0]);
}
