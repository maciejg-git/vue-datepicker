let getRandomInt = (min, max) => Math.random() * (max - min) + min;

export let getDays = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let date = Array.from({ length: 20 }, (i) => {
        let date = new Date(2024, getRandomInt(4, 7), getRandomInt(1, 28));
        date.setHours(0, 0, 0, 0);
        return date;
      });
      resolve(date);
    }, 1000);
  });
};
