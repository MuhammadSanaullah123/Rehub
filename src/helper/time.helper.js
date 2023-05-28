export const parseTimeRange = (rangeString) => {
  const times = [];
  rangeString.replace(/(\d+):(\d+)([a|p])m/g, (data, hour, minute, type, index) => {
    let hourUnixTime = 0;
    const transformedMinute = Number(minute) / 60;
    if (Number(hour) === 12) {
      if (type === "a") {
        if (index > 4) {
          hourUnixTime = 24 + transformedMinute;
        } else if (index < 4) {
          hourUnixTime = transformedMinute;
        }
      }else if (type === "p") {
        hourUnixTime = Number(hour) + transformedMinute;
      }
    } else if (type === "p") {
      hourUnixTime = Number(hour) + 12 + transformedMinute;
    } else {
      hourUnixTime = Number(hour) + transformedMinute;
    }
    times.push(hourUnixTime);
  });
  return times;
};
