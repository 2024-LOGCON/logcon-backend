export const calculateScore = (count) => {
  const minimumPoint = 100;
  const maximumPoint = 500;
  const decay = 10;

  const score = Math.ceil(
    ((minimumPoint - Number(maximumPoint)) / decay ** 2) * count ** 2 +
      Number(maximumPoint),
  );
  if (score < minimumPoint) return minimumPoint;
  else return score;
};
