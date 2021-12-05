import './sources.css';
import { TSources } from '../../interfaces/sources';

// data - массив объектов

interface IItem {
  name: string;
  id: string;
}

class Sources {
  draw(data: TSources[]) {
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    data.forEach((item: IItem) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
      sourceClone.querySelector('.source__item-name')!.textContent = item.name;
      sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const source = document.querySelector('.sources') as HTMLElement;
    source?.append(fragment);
    return this;
  }
}

export default Sources;
