const day = 24 * 60 * 60 * 1000;
const localStorageService = {
  setKey: (name, value) => {
    const expDate = new Date().getTime() + day;
    localStorage.setItem(name, JSON.stringify({ value, expDate }));
  },
  getKey: (name) => {
    const item = JSON.parse(localStorage.getItem(name));
    if (item && new Date().getTime() < item.expDate) {
      return item.value;
    } else {
      console.log(name, "expired");
      localStorage.removeItem(name);
    }
  },
};

export default localStorageService;
