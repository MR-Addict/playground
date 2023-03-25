import { moments } from "@/lib/mongodb";
import { formatDate, groupBy } from "@/lib/utils";
import { MomentType } from "./config";

export default async function fetchMoments() {
  const result = await moments.read();
  if (!result.data) throw new Error("Fetch data failed!");

  const mapData: MomentType[] = result.data.map((item) => ({ ...item, date: formatDate(item.date) }));
  return groupBy(mapData, (moment) => moment.date.split("-").slice(0, -1).join("-"));
}
