export default function closeModal() {
  document.querySelector('.modal__sources')?.classList.remove('open');
  (document.querySelector('.header__input') as HTMLInputElement).value = '';
}
