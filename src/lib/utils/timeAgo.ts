function findFirstNoneZero(data: { year: number; mon: number; day: number; hour: number; min: number; sec: number }) {
  let result = { key: "sec", value: data.sec };

  Object.keys(data).every((key) => {
    let typeChangedKey = key as "year" | "mon" | "day" | "hour" | "min" | "sec";
    const firstNoneZero = data[typeChangedKey];
    if (firstNoneZero !== 0) {
      result = { key, value: firstNoneZero };
      return false;
    }
    return true;
  });

  return result;
}

function calculateTimeAgo(date: string) {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;

  let leftTime = new Date().getTime() - new Date(date).getTime();

  const year = Math.floor(leftTime / oneYear);
  leftTime = leftTime % oneYear;

  const mon = Math.floor(leftTime / oneMonth);
  leftTime = leftTime % oneMonth;

  const day = Math.floor(leftTime / oneDay);
  leftTime = leftTime % oneDay;

  const hour = Math.floor(leftTime / oneHour);
  leftTime = leftTime % oneHour;

  const min = Math.floor(leftTime / oneMinute);
  leftTime = leftTime % oneMinute;

  const sec = Math.floor(leftTime / oneSecond);

  return { year, mon, day, hour, min, sec };
}

export default function timeAgo(date: string) {
  const result = calculateTimeAgo(date);
  const timeago = findFirstNoneZero(result);
  return { ...result, timeago };
}
