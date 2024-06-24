export const formatDisplayDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatDateTime = (
  dateTime: string
): {
  key: string;
  date: string;
  time: string;
} => {
  const date = new Date(dateTime);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(
    date
  );

  return {
    key: dateTime.split(" ")[0],
    date: formattedDate,
    time: formattedTime,
  };
};

export const getLocalStorage = <T>(key: string): T | string => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return "";
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error getting data from localStorage: ${error}`);
    return "";
  }
};

export const setLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error setting data in localStorage: ${error}`);
  }
};

export const groupForecastData = (list = []) => {
  const groupedData = list.reduce((acc: any, item: any) => {
    const key = item.dateTime.key;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return groupedData;
};
