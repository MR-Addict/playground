export default function calculateRuntime() {
  const start = "2023-01-17T07:00:19Z";

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneYear = oneDay * 365;

  let leftTime = new Date().getTime() - new Date(start).getTime();

  const years = Math.floor(leftTime / oneYear);
  leftTime = leftTime % oneYear;

  const days = Math.floor(leftTime / oneDay);
  leftTime = leftTime % oneDay;

  const hours = Math.floor(leftTime / oneHour);
  leftTime = leftTime % oneHour;

  const minutes = Math.floor(leftTime / oneMinute);
  leftTime = leftTime % oneMinute;

  const seconds = Math.floor(leftTime / oneSecond);

  return { start, runtime: { years, days, hours, minutes, seconds } };
}
