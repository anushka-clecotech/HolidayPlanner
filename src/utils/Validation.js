export const validateEmail = email => {
  var mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return mailformat.test(email) ? true : false;
};
export const validateMob = mob => {
  var mobformat = /^[0-9]{10}$/;
  return mobformat.test(mob) ? true : false;
};

export const validateYear = year => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  var yearformat = /^(19[0-9][0-9]|20[0-9][0-9]|2023)$/;
  // var yearformat = '/^(19[0-9][0-9]|20[0-9][0-9]|2023)$/';
  // let name = '2023';
  // let re = new RegExp(`${name}`, 'gi');
  // console.log(yearformat.replace(re, currentYear));
  return yearformat.test(year) ? true : false;
};
export const isEmpty = val => val === '';
