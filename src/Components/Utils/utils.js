const getHashCode = (id) => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let hash = '';
  while (id > 0) {
    hash += arr[id % 10];
    id = Math.floor(id / 10);
  }
  return hash;
};

const getSearchParams = (search) => {
  const paramsArray = search.substring(1).split('&');
  const params = {};
  for (let i = 0; i < paramsArray.length; ++i) {
    const p = paramsArray[i].split('=');
    params[p[0]] = p[1];
  }
  return params;
};

const getCurrentDate = () => {
  const arr = Date().split(' ');
  return arr[0] + ', ' + arr[2] + ' ' + arr[1] + ' ' + arr[3] + ' ' + arr[4] + ' GMT';
};

const formatDate = (date) => {
  if (!date) return '';
  return date.substring(0, 16).split('T')[0];
};

const formatDateTime = (date) => {
  return date.substring(0, 16).split('T').join('   at ');
};

const countries = {
  'Iraq': '964',
  'Jordan': '962',
  'Lebanon': '961',
  'United Arab Emirates': '971',
};

const genders = [
  'Male',
  'Female'
];

const getPasswordHash = (password) => {
  const sha256 = require('crypto-js/sha256');
  return String(sha256(password));
};

const add30Mins = (datetime) => {
  let s = datetime.substring(0, 8);
  let d = new Date(datetime);
  d.setMinutes(d.getMinutes() + 30);
  s += d.toString().split(' ')[2] + 'T' + d.toString().split(' ')[4].substring(0, 5);
  return s;
}


export {getHashCode, getSearchParams, getCurrentDate, formatDate, countries, genders, formatDateTime, getPasswordHash,
add30Mins};
