export function renderHTML():string{
  return /* html */ `
    <div class="jb-checkbox-web-component">
      <div class="svg-wrapper">
        <svg class="check-box-svg" viewBox="0 0 52 52" part="checkbox">
          <rect class="checkmark__cube" x="0" y="0" width="52" height="52" rx="5" ry="5" part="check-bg"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" part="check-mark"/>
        </svg>
      </div>
      <div class="label-wrapper" >
        <slot name="label" part="label"></slot>
      </div>
      <div class="message-box" part="message"></div>
    </div>
  `;
}