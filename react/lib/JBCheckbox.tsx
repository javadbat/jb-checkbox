'use client';
import React, { useRef, useImperativeHandle, type PropsWithChildren, type CSSProperties, } from 'react';
import 'jb-checkbox';
// eslint-disable-next-line no-duplicate-imports
import { JBCheckboxWebComponent } from 'jb-checkbox';
import { EventProps, useEvents } from './events-hook.js';
import { useJBCheckboxAttribute, type JBCheckboxAttributes } from './attributes-hook.js';

declare module "react" {
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
  label?: string | null | undefined,
  className?: string,

}
export type Props = EventProps & PropsWithChildren<JBCheckboxProps> & JBCheckboxAttributes;
export const JBCheckbox = React.forwardRef((props: Props, ref) => {
  const element = useRef<JBCheckboxWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );
  useJBCheckboxAttribute(element,props);
  useEvents(element, props);
  return (
    <jb-checkbox class={props.className ? props.className : ""} label={props.label ? props.label : ''} ref={element} style={props.style}>
      {props.children}
    </jb-checkbox>
  );
});

JBCheckbox.displayName = "JBSwitch";
