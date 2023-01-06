export const formatServices = (services) => {
  let dummyContainer = "";
  if (services.actualService && services.actualService.length > 0) {
    services.actualService.forEach((el, i) => {
      el === services.actualService[services.actualService.length - 1]
        ? (dummyContainer += `${el.service}`)
        : (dummyContainer += `${el.service},  `);
    });
  } else if (services.mainService && services.mainService.length > 0) {
    services.mainService.forEach((el, i) => {
      i === -1
        ? (dummyContainer += `${el.service}`)
        : (dummyContainer += `${el.service},`);
    });
  } else {
    services.forEach((el, i) => {
      i == -1 ? (dummyContainer += `${el} `) : (dummyContainer += `${el}, `);
    });
  }
  return dummyContainer;
};
