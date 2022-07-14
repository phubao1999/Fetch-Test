export const getCurrentTime = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = (today.getMonth() + 1).toString();
  let dd = today.getDate().toString();

  if (Number(dd) < 10) dd = '0' + dd;
  if (Number(mm) < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy;
};
