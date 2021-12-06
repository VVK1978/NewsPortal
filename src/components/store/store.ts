function setChannelNews(channel: string) {
  localStorage.setItem('channel', channel);
}

function setLengthNews(lengthNews: number) {
  const pageSize = 10;
  const allPages: number = Math.ceil(lengthNews / pageSize);
  localStorage.setItem('allPages', JSON.stringify(allPages));
}

export { setChannelNews, setLengthNews };
