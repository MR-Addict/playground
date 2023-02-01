import { formatDate, groupBy } from "@/lib/utils";

import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherWindyCloudy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherStormy,
  TiWeatherSnow,
} from "react-icons/ti";

export const weather = {
  sunny: TiWeatherSunny,
  partlySunny: TiWeatherPartlySunny,
  cloudy: TiWeatherCloudy,
  windy: TiWeatherWindyCloudy,
  rainy: TiWeatherShower,
  downPour: TiWeatherDownpour,
  stormy: TiWeatherStormy,
  snowy: TiWeatherSnow,
};

const moments: {
  id: string;
  date: string;
  moment: string;
  weather: "sunny" | "partlySunny" | "cloudy" | "windy" | "rainy" | "downPour" | "stormy" | "snowy";
}[] = [
  {
    id: "jbnkdksf",
    date: "2023-01-12 12:36:54",
    weather: "sunny",
    moment:
      "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "dafdsaf",
    date: "2023-01-12 12:36:54",
    weather: "partlySunny",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "eavdsa",
    date: "2023-01-12 12:36:54",
    weather: "cloudy",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "jbnkddasdsksf",
    date: "2023-01-10 12:36:54",
    weather: "sunny",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "dafdsvdcdaf",
    date: "2023-01-10 12:36:54",
    weather: "partlySunny",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "eavdyhdsa",
    date: "2023-01-10 12:36:54",
    weather: "cloudy",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "jbnkdksf",
    date: "2023-02-10 12:36:54",
    weather: "sunny",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "dafdsajgbf",
    date: "2023-02-10 12:36:54",
    weather: "partlySunny",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
  {
    id: "eavdsajyr",
    date: "2023-02-10 12:36:54",
    weather: "cloudy",
    moment: "看家里面的狗子和猫咪打架，狗子和猫咪最后都很开心，一起在门口晒太阳。",
  },
];

export default function fetchMoments() {
  const result = moments.map((item) => ({ ...item, date: formatDate(item.date), icon: weather[item.weather] }));
  return groupBy(result, (moment) => moment.date.split("-").slice(0, -1).join("-"));
}
