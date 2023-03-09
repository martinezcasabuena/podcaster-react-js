const day = 24 * 60 * 60 * 1000; // Day in ms
const localStorageService = {
  setKey: (name, value) => {
    const expDate = new Date().getTime() + day;
    try {
      localStorage.setItem(name, JSON.stringify({ value, expDate }));
    } catch (error) {
      console.log("Local storage is full, please empty data.", error);
    }
  },
  getKey: (name) => {
    const item = JSON.parse(localStorage.getItem(name));
    if (item && new Date().getTime() < item.expDate) {
      return item.value;
    } else {
      localStorage.removeItem(name);
    }
  },
};

export default localStorageService;
