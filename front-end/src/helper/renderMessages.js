export const renderMessages = (messagesArr) => {
  let renderArr = [];
  messagesArr.forEach((el) => {
    renderArr.push(<div>{el}</div>);
  });
  return renderArr;
};
