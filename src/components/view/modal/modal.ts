import './modal.css';
import AppController from '../../controller/controller';
import AppView from '../appView';
import ISources from '../../interfaces/sources';
import removeChildrenNodes from '../../utils/remove-childrens';

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

  closeModal() {
    document.querySelector('.modal__sources')?.classList.remove('open');
    (document.querySelector('.header__input') as HTMLInputElement).value = '';
  }

  search(data: ISources) {
    document.querySelector('.header__input')?.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.filter(target.value, data);
    });
  }

  filter(value: string, data: ISources) {
    const temp: ISources = Object.assign([], data);
    temp.sources = this.getDataFiltered(value, data);
    removeChildrenNodes('sources');
    this.view.drawSources(temp);
  }

  getDataFiltered(value: string, data: ISources) {
    return data.sources.filter((source) => {
      return source.id.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }
}

export default Modal;
