export default function timeAgo(date: string) {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;

  let leftTime = new Date().getTime() - new Date(date).getTime();

  const years = Math.floor(leftTime / oneYear);
  leftTime = leftTime % oneYear;

  const months = Math.floor(leftTime / oneMonth);
  leftTime = leftTime % oneMonth;

  const days = Math.floor(leftTime / oneDay);
  leftTime = leftTime % oneDay;

  const hours = Math.floor(leftTime / oneHour);
  leftTime = leftTime % oneHour;

  const minutes = Math.floor(leftTime / oneMinute);
  leftTime = leftTime % oneMinute;

  const seconds = Math.floor(leftTime / oneSecond);

  return { years, months, days, hours, minutes, seconds };
}
