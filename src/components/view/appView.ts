import { IArticles, ISources } from '../interfaces';
import { setLengthNews } from '../store';
import { messageNews, removeChildrenNodes } from '../utils';
import News from './news/news';
import Sources from './sources/sources';

export default class AppView {
  private news: News;

  private sources: Sources;

  public constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IArticles) {
    if (data.totalResults === 0) {
      removeChildrenNodes('.news');
      const message = 'Zero news in this channel... Please choose another.';
      messageNews(message);
    } else {
      setLengthNews(data.totalResults);
      const values = data?.articles ? data?.articles : [];
      const message: string = localStorage
        .getItem('channel')!
        .toLocaleUpperCase()
        .split('-')
        .join(' ');
      this.news.draw(values);
      messageNews(message);
    }
  }

  drawSources(data: ISources) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}
