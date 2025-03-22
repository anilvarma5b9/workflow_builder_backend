import * as moment from 'moment';

export const formatReadDateTime = (date: Date) => {
  if (date != null && date != undefined) {
    return moment(date).format('DD MMM YYYY hh:mm:ss a').toUpperCase();
  } else {
    return '';
  }
};

export const formatReadDate = (date: Date) => {
  if (date != null && date != undefined) {
    return moment(date).format('DD MMM YYYY').toUpperCase();
  } else {
    return '';
  }
};

export const formatDBDateTime = (date: Date) => {
  if (date != null && date != undefined) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss').toUpperCase();
  } else {
    return '';
  }
};

export const formatDBDate = (date: Date) => {
  if (date != null && date != undefined) {
    return moment(date).format('YYYY-MM-DD').toUpperCase();
  } else {
    return '';
  }
};

export const formatMonthAndYear = (date: Date) => {
  if (date != null && date != undefined) {
    return moment(date).format('MMM-YYYY').toUpperCase();
  } else {
    return '';
  }
};

export const formatReadDateTime_FS = (date_string: string) => {
  const date = stringToDate(date_string);
  if (date != null && date != undefined) {
    return moment(date).format('DD MMM YYYY hh:mm:ss a').toUpperCase();
  } else {
    return '';
  }
};

export const formatReadDate_FS = (date_string: string) => {
  const date = stringToDate(date_string);
  if (date != null && date != undefined) {
    return moment(date).format('DD MMM YYYY').toUpperCase();
  } else {
    return '';
  }
};

export const formatDBDateTime_FS = (date_string: string) => {
  const date = stringToDate(date_string);
  if (date != null && date != undefined) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss').toUpperCase();
  } else {
    return '';
  }
};

export const formatDBDate_FS = (date_string: string) => {
  const date = stringToDate(date_string);
  if (date != null && date != undefined) {
    return moment(date).format('YYYY-MM-DD').toUpperCase();
  } else {
    return '';
  }
};

export const formatMonthAndYear_FS = (date_string: string) => {
  const date = stringToDate(date_string);
  if (date != null && date != undefined) {
    return moment(date).format('MMM-YYYY').toUpperCase();
  } else {
    return '';
  }
};

// Additional
export const formatYearAndMonth = (date: Date) => {
  if (date != null && date != undefined) {
    return moment(date).format('YYYY_MM_MMM').toUpperCase();
  } else {
    return '';
  }
};

export const stringToDate = (date_string: string) => {
  if (date_string != null && date_string != undefined) {
    return new Date(date_string);
  } else {
    return null;
  }
};

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const convertSecondsTo_HH_MM_SS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hourString = hours > 9 ? `${hours}` : `0${hours}`;
  const minuteString = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const secondString =
    remainingSeconds > 9 ? `${remainingSeconds}` : `0${remainingSeconds}`;

  return `${hourString}:${minuteString}:${secondString}`;
};

export const convertSecondsTo_DD_HH_MM_SS = (seconds: number): string => {
  const days = Math.floor(seconds / 86400); // 86400 seconds in a day
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hourString = hours > 9 ? `${hours}` : `0${hours}`;
  const minuteString = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const secondString =
    remainingSeconds > 9 ? `${remainingSeconds}` : `0${remainingSeconds}`;

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hourString}:${minuteString}:${secondString}`;
  } else {
    return `${hourString}:${minuteString}:${secondString}`;
  }
};

export const get_seconds_FS = (date_string: string): number => {
  return Math.floor(new Date(date_string).getTime() / 1000);
};
