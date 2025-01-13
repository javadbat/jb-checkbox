import { renderHTML } from './render';
import CSS from './jb-checkbox.scss';

import { ValidationHelper, ValidationItem, ValidationResult, type WithValidation } from 'jb-validation';
import { type JBFormInputStandards } from 'jb-form';
import { ElementsObject, ValidationValue } from './types.js';

export * from './types.js';

export class JBCheckboxWebComponent extends HTMLElement implements WithValidation, JBFormInputStandards<boolean> {
  static get formAssociated() { return true; }
  #value = false;
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
    if (this.#value !== value) {
      this.#value = value;
    }
    this.#updateDomForValueChange();
    //comment for typescript problem
    if (this.#internals && typeof this.#internals.setFormValue == "function") {
      this.#internals.setFormValue(`${value}`);
    }
  }
  #validation = new ValidationHelper({
    clearValidationError:this.clearValidationError.bind(this),
    getValue:() => (this.value),
    getValidations: this.#GetInsideValidationsCallback.bind(this),
    getValueString: () =>(this.value ? 'true' : 'false'),
    setValidationResult:this.#setValidationResult.bind(this),
    showValidationError:this.showValidationError.bind(this)
  })
  get validation(){
    return this.#validation;
  }
  get name(){
    return this.getAttribute('name') || '';
  }
  initialValue = false;
  get isDirty(): boolean{
    return this.#value !== this.initialValue;
  }
  #required = false;
  set required(value:boolean){
    this.#required = value;
    this.#validation.checkValiditySync({showError:false});
  }
  get required() {
    return this.#required;
  }
  isAutoValidationDisabled= false;
  get disabled(){
    return this.#disabled;
  }
  set disabled(value:boolean){
    this.#disabled = value;
    if(value){
      //TODO: remove as any when typescript support
      (this.#internals as any).states?.add("disabled");
    }else{
      (this.#internals as any).states?.delete("disabled");
    }
  }
  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser don't support attachInternals
      this.#internals = this.attachInternals();
    }
    this.initWebComponent();
  }
  connectedCallback(): void {
    // standard web component event that called when all of dom is bound
    this.callOnLoadEvent();
    this.initProp();
    this.callOnInitEvent();

  }
  callOnLoadEvent(): void {
    const event = new CustomEvent('load', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  callOnInitEvent(): void {
    const event = new CustomEvent('init', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  initWebComponent(): void {
    const shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });
    const html = `<style>${CSS}</style>` + '\n' + renderHTML();
    const element = document.createElement('template');
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.elements = {
      componentWrapper: shadowRoot.querySelector('.jb-checkbox-web-component')!,
      label: shadowRoot.querySelector('.label-wrapper')!,
      svgWrapper: shadowRoot.querySelector('.svg-wrapper')!,
      svg: shadowRoot.querySelector('.check-box-svg')!,
    };
    this.registerEventListener();
  }
  registerEventListener(): void {
    this.elements.componentWrapper.addEventListener('click', () => this.#onComponentClick());
  }
  initProp() {
    this.#disabled = false;
    this.value = this.getAttribute('value') === "true" || false;
  }
  static get observedAttributes(): string[] {
    return ["label", 'value', 'name', 'disabled',];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string): void {
    switch (name) {
      case 'value':
        this.value = Boolean(value);
        break;
      case 'label':
        this.elements.label.innerText = value;
        break;
      case 'disabled':
        if (value == '' || value === "true") {
          this.#disabled = true;
        } else if (value == "false" || value == null || value == undefined) {
          this.#disabled = false;
        }
        break;

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
      this.value = !this.#value;
      const DispatchedEvent = this.#dispatchOnChangeEvent();
      if(DispatchedEvent.defaultPrevented){
        this.value = !this.#value;
      }
    }
  }
  #dispatchOnBeforeChangeEvent(): boolean {
    const event = new CustomEvent('before-change', { cancelable: true });
    this.dispatchEvent(event);
    const prevented = event.defaultPrevented;
    return prevented;
  }
  #dispatchOnChangeEvent() {
    const event = new Event('change',{bubbles:true,cancelable:true,composed:true});
    this.dispatchEvent(event);
    return event;
  }
  /**
   * @public
   */
  //TODO: find a way to manage focus and keyboard control
  focus() {
    //public method
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
      this.#internals.setValidity({}, '');
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach((res) => {
        if (!res.isValid) {
          if (res.validation.stateType) { states[res.validation.stateType] = true; }
          if (message == '') { message = res.message; }
        }
      });
      this.#internals.setValidity(states, message);
    }
  }
  #GetInsideValidationsCallback():ValidationItem<ValidationValue>[]{
    if(this.#required){
      return [{
        validator:(value)=>value!==false,
        message:"چک میبایست فعال شود"
      }];
    }
    return [];
  }
  showValidationError(message: string) {
    //TODO: implement it
  }
  clearValidationError() {
    //TODO: implement it
  }
  get validationMessage(){
    return this.#internals.validationMessage;
  }

  checkValidity(){
    return this.#validation.checkValiditySync({showError:false}).isAllValid;
  }
  reportValidity(){
    return this.#validation.checkValiditySync({showError:true}).isAllValid;
  }
}
const myElementNotExists = !customElements.get('jb-checkbox');
if (myElementNotExists) {
  window.customElements.define('jb-checkbox', JBCheckboxWebComponent);
}
