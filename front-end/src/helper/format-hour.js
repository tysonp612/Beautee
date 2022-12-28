export const getFormattedTime = (hour) => {
  let formattedTime;
  const getNum = hour.toString().split(".")[0];
  const getFloat = hour.toString().split(".")[1];
  if (hour.toString().includes(".")) {
    switch (getFloat) {
      case "25":
        formattedTime = `${getNum}:15`;
        break;
      case "5":
        formattedTime = `${getNum}:30`;
        break;
      case "75":
        formattedTime = `${getNum}:45`;
        break;
    }
  } else {
    formattedTime = `${getNum}:00`;
  }

  return formattedTime;
};
