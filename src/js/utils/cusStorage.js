// 先封裝起來，若有其他操作需求，可直接新增

const cusStorage = {
  prefix: 'la_',
  setItem(key, val) {
    const jsonVal = JSON.stringify(val);
    localStorage.setItem(`${this.prefix}${key}`, jsonVal);
  },
  getItem(key) {
    const parseVal = localStorage.getItem(`${this.prefix}${key}`) || '';
    return parseVal !== '' ? JSON.parse(parseVal) : null;
  },
  removeItem(key, callback) {
    localStorage.removeItem(`${this.prefix}${key}`);

    if (callback) {
      callback();
    }
  },
  clearAll() {
    localStorage.clearAll();
  },
};

export default cusStorage;
