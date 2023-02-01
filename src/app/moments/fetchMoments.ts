import { moments } from "@/lib/mongodb";
import { formatDate, groupBy } from "@/lib/utils";

export const allWeathers = ["sunny", "partlySunny", "cloudy", "windy", "rainy", "stormy", "downpour"];

export interface MomentType {
  _id: string;
  date: string;
  weather: string;
  moment: string;
}

export default async function fetchMoments() {
  const result = await moments.read();
  if (!result.data) throw new Error("Fetch data failed!");

  const mapData: MomentType[] = result.data.map((item) => ({ ...item, date: formatDate(item.date) }));
  return groupBy(mapData, (moment) => moment.date.split("-").slice(0, -1).join("-"));
}
