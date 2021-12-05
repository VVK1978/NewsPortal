import { AppView } from './../view/appView';
import AppController from '../controller/controller';
import IArticles from '../interfaces/articles';
import Modal from '../view/modal/modal';
import footer from '../view/footer/footer';

class App {
  private controller: AppController;

  private view: AppView;

  private modal: Modal;

  private state: {
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
    document
      .querySelector('.modal__close')
      ?.addEventListener('click', () => this.modal.closeModal());

    document.querySelector('.sources')!.addEventListener('click', (e: Event) => {
      this.modal.closeModal();
      this.state.page = 1;
      this.controller.getNews((data: IArticles) => this.view.drawNews(data), this.state.page, e);
      this.disabledEnabledElement('.prev', true);
      this.disabledEnabledElement('.next', false);
    });
  }

  pagination() {
    document
      .querySelector('.pagination')
      ?.addEventListener('click', (e: Event) => this.events(e), { once: true });
  }

  events(e: Event) {
    const target = e.target as HTMLElement;

    if (target.id === 'modal') {
      this.modal.openModal();
    }

    if (target.id === 'next') {
      this.state.allPages = +localStorage.getItem('allPages')!;
      this.state.page += 1;
      if (this.state.page > 1) {
        this.disabledEnabledElement('.prev', false);
      }
      if (this.state.page === this.state.allPages) {
        this.disabledEnabledElement('.next', true);
        this.state.page = this.state.allPages;
      }
      this.controller.getNewsPagination(
        (data: IArticles) => this.view.drawNews(data),
        this.state.page,
      );
    }

    if (target.id === 'prev') {
      this.state.page -= 1;
      if (this.state.page < 2) {
        this.disabledEnabledElement('.prev', true);
        this.state.page = 1;
      }
      if (this.state.page < this.state.allPages) {
        this.disabledEnabledElement('.next', false);
      }
      this.controller.getNewsPagination(
        (data: IArticles) => this.view.drawNews(data),
        this.state.page,
      );
    }
    this.pagination();
  }

  disabledEnabledElement(selector: string, isDisabled: boolean) {
    const element = <HTMLInputElement>document.querySelector(`${selector}`);
    element.disabled = isDisabled;
  }
}

export default App;
