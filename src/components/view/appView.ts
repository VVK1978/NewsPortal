/* eslint-disable @typescript-eslint/no-explicit-any */
import News from './news/news';
import Sources from './sources/sources';
import IArticles from '../interfaces/articles';
import ISources from '../interfaces/sources';
import { setLengthNews } from '../utils/store';
import removeChildrenNodes from '../utils/remove-childrens';

export class AppView {
  private news: News;

  private sources: Sources;

  public constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IArticles) {
    if (data.totalResults === 0) {
      removeChildrenNodes('news');
      const message='Zero news in this channel... Please choose another.'
      this.messageNews(message);
    } else {
      setLengthNews(data.totalResults);
      const values = data?.articles ? data?.articles : [];
      const message:string =localStorage
      .getItem('channel')!
      .toLocaleUpperCase()
      .split('-')
      .join(' ');
      this.news.draw(values);
      this.messageNews(message);
    }
  }

  drawSources(data: ISources) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }

  messageNews(message:string) {
    const news = <HTMLElement>document.querySelector('.news');
    const zeroNews = document.createElement('h3') as HTMLElement;
    zeroNews.classList.add('zero__news');
    zeroNews.textContent = message;
    news.prepend(zeroNews);
  }
}

export default AppView;
