const objectToQueryString = obj => {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  });
  return keyValuePairs.join('&');
};

export default objectToQueryString;
