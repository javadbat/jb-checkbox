import React, { useEffect, useRef, useState, useImperativeHandle, useCallback, } from 'react';
import 'jb-switch';
// eslint-disable-next-line no-duplicate-imports
import { JBCheckboxWebComponent, ValidationValue } from 'jb-checkbox';
import { useBindEvent } from '../../../../common/hooks/use-event.js';
import { type ValidationItem } from 'jb-validation';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-checkbox': JBSwitchType;
    }
    interface JBSwitchType extends React.DetailedHTMLProps<React.HTMLAttributes<JBCheckboxWebComponent>, JBCheckboxWebComponent> {
      class?: string,
      name?: string,
      "label"?: string,
    }
  }
}
export type JBCheckboxEventType<T> = T & {
  target: JBCheckboxWebComponent
}
export type JBCheckboxProps = {
  style?: string,
  name?: string,
  className?: string,
  onChange?: (e: JBCheckboxEventType<Event>) => void | null | undefined,
  value?: boolean | null | undefined,
  label?: string | null | undefined,
  validationList?: ValidationItem<ValidationValue>[] | null,
}

export const JBCheckbox = React.forwardRef((props: JBCheckboxProps, ref) => {
  const element = useRef<JBCheckboxWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  const onchange = useCallback((e: JBCheckboxEventType<Event>) => {
    if (props.value !== undefined && props.value !== null) {
      e.preventDefault();
    }
    if (typeof props.onChange == "function") {
      props.onChange(e);
    }
  }, [props.onChange, props.value]);


  useBindEvent(element, 'before-change', onchange, true);
  // useEvent(element.current, 'change', onchange, true);
  useEffect(() => {
    if (element.current && props.value !== null && props.value !== undefined) {
      element.current.value = props.value;
    }
  }, [props.value]);

  useEffect(() => {
    if (element.current && typeof props.style == "string") {
      element.current.setAttribute("style", props.style);
    }
  }, [props.style]);
  useEffect(() => {
    if (element.current && typeof props.name == "string") {
      element.current.setAttribute("name", props.name);
    }else if(element.current && props.name == null){
      element.current.removeAttribute("name");
    }
  }, [props.name]);
  useEffect(() => {
    if (element.current && Array.isArray( props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList]);

  return (
    <jb-checkbox class={props.className ? props.className : ""} label={props.label ? props.label : ''} ref={element}>
    </jb-checkbox>
  );
});

JBCheckbox.displayName = "JBSwitch";
