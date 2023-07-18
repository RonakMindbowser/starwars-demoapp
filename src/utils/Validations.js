import moment from 'moment';

export const isEmptyOrNull = input => {
  return input === null || input === undefined || input === '' || input === {};
};

export const getFormattedDate = date => {
  let updatedDate = moment(date).format('DD MMM, YYYY hh:mm A');
  return updatedDate;
};

export const getFormattedString = value => {
  const str = String(value);
  const arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};
