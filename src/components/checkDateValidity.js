const checkDateValidity = (str) => {
    const arr = str.split('.');
    const test =
      /^[0-3]\d\.[0-1]\d\.\d{2}$/.test(str) &&
      arr[0] > 0 &&
      arr[0] <= 31 &&
      arr[1] > 0 &&
      arr[1] <= 12;
    if (!test) return null;
    const date = new Date();
    const years = +arr[2] > 40 ? 19 : 20;
    date.setFullYear(years + arr[2], arr[1] - 1, arr[0]);
    return date.getTime();
};

export default checkDateValidity;