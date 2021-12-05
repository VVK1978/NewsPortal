import icon from '../../../assets/icons/rs_school_js.svg';
import './footer.css';

export default function footer() {
  const rsImage = <HTMLImageElement>document.querySelector('.rs__image');
  rsImage.src = icon;
}
