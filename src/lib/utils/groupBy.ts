export default function groupBy<T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) {
  const groups = array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });

  const totalCount = array.length;

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      count: groups[date].length,
      data: groups[date],
    };
  });
  return { totalCount: totalCount, data: groupArrays };
}
