
/**
 * 运动数据计算服务 (Android Service Logic)
 */
export const calculatePace = (seconds: number, distance: number): string => {
  if (distance <= 0) return "--'--\"";
  const paceMin = (seconds / 60) / distance;
  const mins = Math.floor(paceMin);
  const secs = Math.round((paceMin - mins) * 60);
  return `${mins}'${secs.toString().padStart(2, '0')}"`;
};

export const formatDuration = (totalSeconds: number) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return {
    hours: hrs.toString().padStart(2, '0'),
    minutes: mins.toString().padStart(2, '0'),
    seconds: secs.toString().padStart(2, '0'),
  };
};
