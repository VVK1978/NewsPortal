import './modal.css';
import AppController from '../../controller/controller';
import { ISources } from '../../interfaces';
import { getDataFiltered, removeChildrenNodes } from '../../utils';
import AppView from '../appView';

class Modal {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  openModal() {
    this.controller.getSources((data: ISources) => {
      this.view.drawSources(data);
      if (data.status === 'ok') {
        this.search(data);
      }
    });
    document.querySelector('.modal__sources')?.classList.add('open');
  }

  search(data: ISources) {
    document.querySelector('.header__input')?.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.filter(target.value, data);
    });
  }

  filter(value: string, data: ISources) {
    const temp: ISources = Object.assign([], data);
    temp.sources = getDataFiltered(value, data);
    removeChildrenNodes('.sources');
    this.view.drawSources(temp);
  }
}

export default Modal;
