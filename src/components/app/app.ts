import AppController from '../controller/controller';
import { IArticles } from '../interfaces';
import { closeModal, disabledEnabledElement } from '../utils';
import AppView from '../view/appView';
import footer from '../view/footer/footer';
import Modal from '../view/modal/modal';

class App {
  private controller: AppController;

  private view: AppView;

  private modal: Modal;

  private readonly state: {
    page: number;
    pageSize: number;
    allPages: number;
  };

  public constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.modal = new Modal();
    this.pagination();
    this.state = {
      page: 1,
      pageSize: 10,
      allPages: 0,
    };
    footer();
  }

  start() {
    document.querySelector('.modal__close')?.addEventListener('click', () => closeModal());

    document.querySelector('.sources')?.addEventListener('click', (event: Event) => {
      closeModal();
      this.state.page = 1;
      this.controller.getNews(
        (data: IArticles) => this.view.drawNews(data),
        this.state.page,
        event
      );
      disabledEnabledElement('.prev', true);
      disabledEnabledElement('.next', false);
    });
  }

  pagination() {
    document
      .querySelector('.pagination')
      ?.addEventListener('click', (event: Event) => this.events(event), { once: true });
  }

  events(event: Event) {
    const target = event.target as HTMLElement;

    if (target.id === 'modal') {
      this.modal.openModal();
    }

    if (target.id === 'next') {
      this.state.allPages = +localStorage.getItem('allPages')!;
      this.state.page += 1;
      if (this.state.page > 1) {
        disabledEnabledElement('.prev', false);
      }
      if (this.state.page === this.state.allPages) {
        disabledEnabledElement('.next', true);
        this.state.page = this.state.allPages;
      }
      this.controller.getNewsPagination(
        (data: IArticles) => this.view.drawNews(data),
        this.state.page
      );
    }

    if (target.id === 'prev') {
      this.state.page -= 1;
      if (this.state.page < 2) {
        disabledEnabledElement('.prev', true);
        this.state.page = 1;
      }
      if (this.state.page < this.state.allPages) {
        disabledEnabledElement('.next', false);
      }
      this.controller.getNewsPagination(
        (data: IArticles) => this.view.drawNews(data),
        this.state.page
      );
    }
    this.pagination();
  }
}

export default App;
