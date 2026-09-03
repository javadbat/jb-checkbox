import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import { renderHTML } from './render';
import CSS from './jb-checkbox.css';
import VariablesCSS from './variables.css';

import { ValidationHelper, type ValidationItem, type ValidationResult, type ShowValidationErrorParameters, type WithValidation } from 'jb-validation';
import type { JBFormInputStandards, JBFormWebComponent } from 'jb-form';
import type { ElementsObject, ValidationValue } from './types.js';
import { registerDefaultVariables } from 'jb-core/theme';
import { dictionary } from './i18n';
import { i18n } from 'jb-core/i18n';
export * from './types.js';

export class JBCheckboxWebComponent extends JBBaseComponent implements WithValidation, JBFormInputStandards<boolean> {
  static get formAssociated() { return true; }
  #value = false;
  #isDirty = false;
  //when we call on before change we save new value here so when user use event.target.value he will see new value but after the event bubble done we null it.
  //it mostly defined here for react eco-system
  #ChangeEventPreservedValue: boolean | null = null;
  elements!: ElementsObject;
  #disabled = false;
  #internals?: ElementInternals;
  get value(): boolean {
    if (this.#ChangeEventPreservedValue !== null) {
      return this.#ChangeEventPreservedValue;
    }
    return this.#value;
  }
  set value(value: boolean) {
    this.#isDirty = true;
    value ? this.#setValue(true) : this.#clearValue();
  }
  #setValue(value: boolean) {
    if (this.#value !== value) {
      this.#value = value;
    }
    this.#updateDomForValueChange();
    if (this.#internals) {
      this.#internals.ariaChecked = value ? "true" : "false";
      if (value) {
        this.#internals.states?.add("checked");
      } else {
        this.#internals.states?.delete("checked");
      }
      this.#updateFormValue();
    }

  }
  #clearValue() {
    this.#setValue(false);
  }
  #updateFormValue() {
    if (this.#internals && typeof this.#internals.setFormValue == "function") {
      this.#internals.setFormValue(`${this.#value}`);
    }
  }
  get checked() {
    return this.value === true;
  }
  set checked(value: boolean) {
    this.value = Boolean(value);
  }
  #validation = new ValidationHelper({
    getValue: () => (this.value),
    getValidations: this.#getInsideValidationsCallback.bind(this),
    getValueString: () => (this.value ? 'true' : 'false'),
    setValidationResult: this.#setValidationResult.bind(this),
    showValidationError: this.showValidationError.bind(this),
    clearValidationError: this.clearValidationError.bind(this),
  })
  get validation() {
    return this.#validation;
  }
  get name() {
    return this.getAttribute('name') || '';
  }
  set name(value: string) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }
  #initialValue = false;
  /**
   * Default and reset value. It initializes `value` until the live value is explicitly set.
   */
  get initialValue(): boolean {
    return this.#initialValue;
  }
  set initialValue(value: boolean) {
    this.#initialValue = value ?? false;
    if (!this.#isDirty) {
      this.#setValue(this.#initialValue);
    }
  }
  reset() {
    this.#isDirty = false;
    this.#setValue(this.initialValue);
    this.#validation.reset();
    this.#internals?.setValidity({}, '');
  }
  formResetCallback() {
    this.reset();
  }
  get isDirty(): boolean {
    return this.#value !== this.initialValue;
  }
  #required = false;
  set required(value: boolean) {
    this.#required = value;
    if (this.#internals) this.#internals.ariaRequired = value ? "true" : "false";
    this.#validation.checkValiditySync({ showError: false });
  }
  get required() {
    return this.#required;
  }
  isAutoValidationDisabled = false;
  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    if (value) {
      this.#internals?.states?.add("disabled");
      this.#internals!.ariaDisabled = "true";
    } else {
      this.#internals?.states?.delete("disabled");
      this.#internals!.ariaDisabled = "false";
    }
    this.#syncFocusableState();
  }
  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser don't support attachInternals
      this.#internals = this.attachInternals();
      this.#internals.role = "checkbox";
    }
    this.#initWebComponent();
  }
  get form(): HTMLFormElement | JBFormWebComponent | null {
    return this.#internals?.form ?? null;
  }
  formAssociatedCallback?: ((form: HTMLFormElement | null) => void) | undefined;
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }
  formStateRestoreCallback?: ((state: string | File | FormData | null, mode: 'autocomplete' | 'restore') => void) | undefined;
  connectedCallback(): void {
    // standard web component event that called when all of dom is bound
    this.callOnLoadEvent();
    this.initProp();
    this.callOnInitEvent();

  }
  callOnLoadEvent(): void {
    const event = new CustomEvent('load', { bubbles: true, composed: false });
    this.dispatchEvent(event);
  }
  callOnInitEvent(): void {
    const event = new CustomEvent('init', { bubbles: true, composed: false });
    this.dispatchEvent(event);
  }
  #initWebComponent(): void {
    if (!this.shadowRoot) {
      this.attachShadow({
        mode: 'open',
        delegatesFocus: true,
        serializable: true,
        clonable: true,
      });
    }

    registerDefaultVariables();
    const html = `<style>${CSS} ${VariablesCSS}</style>\n${renderHTML()}`;
    const element = document.createElement('template');
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
    this.elements = {
      componentWrapper: this.shadowRoot!.querySelector('.jb-checkbox-web-component')!,
      label: this.shadowRoot!.querySelector('.label-wrapper slot')!,
      svgWrapper: this.shadowRoot!.querySelector('.svg-wrapper')!,
      svg: this.shadowRoot!.querySelector('.check-box-svg')!,
      message: this.shadowRoot!.querySelector('.message-box')!,
    };
    this.registerEventListener();
  }
  registerEventListener(): void {
    this.elements.componentWrapper.addEventListener('click', () => this.#onComponentClick());
    this.elements.componentWrapper.addEventListener('keydown', (event) => this.#onKeyDown(event));
    this.elements.componentWrapper.addEventListener('keyup', (event) => this.#onKeyUp(event));
  }
  initProp() {
    if (this.hasAttribute('value')) {
      this.value = parseBooleanAttribute(this.getAttribute('value'));
    }
  }
  static get observedAttributes(): string[] {
    return ["label", "message", 'value', 'name', 'disabled', 'required', 'error'];
  }
  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string): void {
    switch (name) {
      case 'value':
        this.value = parseBooleanAttribute(value);
        break;
      case 'label':
        this.elements.label.innerText = value;
        this.#internals!.ariaLabel = value;
        break;
      case 'disabled':
        this.disabled = parseBooleanAttribute(value);
        break;
      case 'required':
        this.required = parseBooleanAttribute(value);
        break;
      case 'message':
        this.elements.message.innerHTML = value;
        if (this.#internals) this.#internals.ariaDescription = value;
        break;
      case 'error':
        this.reportValidity();
    }

  }
  #onComponentClick(): void {
    if (this.#disabled) {
      return;
    }
    this.#ChangeEventPreservedValue = !this.#value;
    const isEventPrevented = this.#dispatchOnBeforeChangeEvent();
    this.#ChangeEventPreservedValue = null;
    if (!isEventPrevented) {
      const wasDirty = this.#isDirty;
      this.#isDirty = true;
      this.#setValue(!this.#value);
      this.#validation.checkValidity({ showError: true });
      const DispatchedEvent = this.#dispatchOnChangeEvent();
      if (DispatchedEvent.defaultPrevented) {
        this.#setValue(!this.#value);
        this.#isDirty = wasDirty;
      }
    }
  }
  #onKeyDown(event: KeyboardEvent): void {
    if (this.#isSpaceKey(event)) {
      event.preventDefault();
    }
  }
  #onKeyUp(event: KeyboardEvent): void {
    if (this.#disabled) {
      return;
    }
    if (this.#isSpaceKey(event)) {
      event.preventDefault();
      this.#onComponentClick();
    }
  }
  #isSpaceKey(event: KeyboardEvent): boolean {
    return event.key === ' ' || event.key === 'Spacebar';
  }
  #dispatchOnBeforeChangeEvent(): boolean {
    const event = new CustomEvent('before-change', { cancelable: true });
    this.dispatchEvent(event);
    const prevented = event.defaultPrevented;
    return prevented;
  }
  #dispatchOnChangeEvent() {
    const event = new Event('change', { bubbles: true, cancelable: true, composed: true });
    this.dispatchEvent(event);
    return event;
  }
  /**
   * @public
   */
  focus(options?: FocusOptions) {
    //public method
    if (!this.#disabled) {
      this.elements.componentWrapper.focus(options);
    }
  }
  #syncFocusableState() {
    this.elements.componentWrapper.tabIndex = this.#disabled ? -1 : 0;
  }
  #updateDomForValueChange() {
    if (this.value) {
      this.elements.svg.classList.add('--active');
    } else {
      this.elements.svg.classList.remove('--active');
    }

  }
  /**
* @description this method called on every checkValidity calls and update validation result of #internal
*/
  #setValidationResult(result: ValidationResult<ValidationValue>) {
    if (result.isAllValid) {
      this.#internals?.setValidity({}, '');
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach((res) => {
        if (!res.isValid) {
          if (res.validation.stateType) { states[res.validation.stateType] = true; }
          if (message == '') { message = res.message ?? ""; }
        }
      });
      this.#internals?.setValidity(states, message);
    }
  }
  #getInsideValidationsCallback(): ValidationItem<ValidationValue>[] {
    const validationList: ValidationItem<ValidationValue>[] = []

    if (this.#required) {
      const message: string = this.getAttribute("required") ?? "".length > 0 ? this.getAttribute("required")! : dictionary.get(i18n, "requiredMessage")
      validationList.push({
        validator: (value) => value !== false,
        message,
        stateType: "valueMissing"
      });
    }
    if (this.getAttribute("error") !== null && (this.getAttribute("error") ?? "").trim().length > 0) {
      validationList.push({
        validator: undefined,
        message: this.getAttribute("error") ?? "",
        stateType: "customError"
      });
    }
    return validationList;
  }
  showValidationError(error: ShowValidationErrorParameters) {
    this.elements.message.innerHTML = error.message;
    //invalid state is used for ui purpose
    this.#internals?.states?.add("invalid");
    this.#internals!.ariaInvalid = "true"
    this.#internals!.ariaDescription = error.message;
  }
  clearValidationError() {
    const text = this.getAttribute("message") || "";
    this.elements.message.innerHTML = text;
    this.#internals?.states?.delete("invalid");
    this.#internals!.ariaInvalid = "false"
    this.#internals!.ariaDescription = text;
  }
  get validationMessage() {
    return this.#internals!.validationMessage;
  }
  get validity() {
    return this.#internals?.validity;
  }

  checkValidity() {
    return this.#validation.checkValiditySync({ showError: false }).isAllValid;
  }
  reportValidity() {
    return this.#validation.checkValiditySync({ showError: true }).isAllValid;
  }
}
defineWebComponent('jb-checkbox', JBCheckboxWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-checkbox": JBCheckboxWebComponent;
  }
}
