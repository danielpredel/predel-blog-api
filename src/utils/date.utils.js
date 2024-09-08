const getCurrentDate = () => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return currentDate.toLocaleDateString("en-US", options);
};

const getStringDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

module.exports = {
  getCurrentDate,
  getStringDate,
};
