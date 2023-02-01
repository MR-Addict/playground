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

export default function GetWeatherIcon({ weather }: { weather: string }) {
  if (weather === "sunny") return <TiWeatherSunny />;
  else if (weather === "partlySunny") return <TiWeatherPartlySunny />;
  else if (weather === "cloudy") return <TiWeatherCloudy />;
  else if (weather === "windy") return <TiWeatherWindyCloudy />;
  else if (weather === "rainy") return <TiWeatherShower />;
  else if (weather === "stormy") return <TiWeatherStormy />;
  else if (weather === "downpour") return <TiWeatherDownpour />;
  return <TiWeatherSnow />;
}
