const getCurrentDate = () => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return currentDate.toLocaleDateString("en-US", options);
};

module.exports = {
  getCurrentDate,
};
