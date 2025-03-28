import React, { useEffect, useRef, useState, useImperativeHandle, useCallback, PropsWithChildren, CSSProperties, } from 'react';
import 'jb-checkbox';
// eslint-disable-next-line no-duplicate-imports
import { JBCheckboxWebComponent, ValidationValue } from 'jb-checkbox';
import { type ValidationItem } from 'jb-validation';
import { EventProps, useEvents } from './events-hook.js';

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
type JBCheckboxProps = {
  style?: CSSProperties,
  name?: string,
  className?: string,
  value?: boolean | null | undefined,
  label?: string | null | undefined,
  validationList?: ValidationItem<ValidationValue>[] | null,
  disabled?: boolean,
}
export type Props = EventProps & PropsWithChildren<JBCheckboxProps>;
export const JBCheckbox = React.forwardRef((props: Props, ref) => {
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
    } else if (element.current && props.name == null) {
      element.current.removeAttribute("name");
    }
  }, [props.name]);

  useEffect(() => {
    if (element.current) {
      element.current.disabled = Boolean(props.disabled);
    }
  }, [element.current, props.disabled]);

  useEffect(() => {
    if (element.current && Array.isArray(props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList]);
  useEvents(element,props);
  return (
    <jb-checkbox class={props.className ? props.className : ""} label={props.label ? props.label : ''} ref={element}>
      {props.children}
    </jb-checkbox>
  );
});

JBCheckbox.displayName = "JBSwitch";
