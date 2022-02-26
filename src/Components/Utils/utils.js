
const getHashCode = (id) => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let hash = "";
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


export { getHashCode, getSearchParams };
