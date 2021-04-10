import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

export const toAgoDateFormat = (date?: string) => {
  if (typeof date === "undefined") {
    return "sometime ago";
  }
  let newDate = dayjs(date).fromNow().toString();
  return newDate;
};
