import { IArticles, ISources } from '../interfaces';
import { setChannelNews } from '../store';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback: (data: ISources) => void) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(callback: (data: IArticles) => void, page: number, event: Event) {
    let target = event.target as HTMLElement;
    const newsContainer = event.currentTarget as HTMLElement;
    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId: string = target.getAttribute('data-source-id')!;
        setChannelNews(sourceId);
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          (newsContainer.setAttribute('data-source', sourceId)! as unknown) as HTMLElement;
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
                pageSize: 10,
                page: `${page}`,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }

  getNewsPagination(callback: (data: IArticles) => void, page: number) {
    const sourceId = localStorage.getItem('channel');
    super.getResp(
      {
        endpoint: 'everything',
        options: {
          sources: sourceId,
          pageSize: 10,
          page: `${page}`,
        },
      },
      callback
    );
  }
}

export default AppController;
