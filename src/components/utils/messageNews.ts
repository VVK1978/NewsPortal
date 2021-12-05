export default function messageNews(message: string) {
  const news = <HTMLElement>document.querySelector('.news');
  const zeroNews = document.createElement('h3') as HTMLElement;
  zeroNews.classList.add('zero__news');
  zeroNews.textContent = message;
  news.prepend(zeroNews);
}
