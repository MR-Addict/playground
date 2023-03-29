import { moment } from "@/lib/mongodb";
import { formatDate, groupBy } from "@/lib/utils";

export default async function fetchMoments() {
  const result = await moment.read();
  if (!result.data) throw new Error("Fetch data failed");

  const mapData = result.data.map((item) => ({ ...item, _id: item._id.toString(), date: formatDate(item.date) }));
  return groupBy(mapData, (moment) => moment.date.split("-").slice(0, -1).join("-"));
}
