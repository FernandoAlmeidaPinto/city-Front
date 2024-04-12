export const getTimeNow = () => {
  let date = new Date();
  return date.toLocaleDateString("pt-BR");
};