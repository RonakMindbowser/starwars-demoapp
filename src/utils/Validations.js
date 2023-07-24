import moment from 'moment';

export const isEmptyOrNull = input => {
  return input === null || input === undefined || input === '' || input === {};
};

export const getFormattedDate = date => {
  let updatedDate = moment(date).format('DD-MM-YYYY');
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

export const isValidEmail = email => {
  if (email.length > 320) return false;
  let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return expression.test(String(email).toLowerCase());
};

// validation for password
export const isValidPassword = password => {
  var regularExpression =
    /^(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  return regularExpression.test(String(password));
};

// export const intToRGB = value => {
//   //credit to https://stackoverflow.com/a/2262117/2737978 for the idea of how to implement
//   var blue = Math.floor(value % 256);
//   var green = Math.floor((value / 256) % 256);
//   var red = Math.floor((value / 256 / 256) % 256);

//   return 'rgb(' + red + ',' + green + ',' + blue + ')';
// };

// export function generateRandomColor(value) {
//   var randomColor = '#' + Math.floor(value * 167776215).toString(16);
//   return randomColor;
// }

export const getRandomColorCode = value => {
  let color = '#';
  let letters = '0123456789ABCDEF';
  color += value * 16;
  for (let i = 0; i < 4; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
