export default function disabledEnabledElement(selector: string, isDisabled: boolean) {
  const element = <HTMLInputElement>document.querySelector(selector);
  element.disabled = isDisabled;
}
