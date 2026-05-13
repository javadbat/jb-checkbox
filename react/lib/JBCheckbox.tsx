'use client';
import React, { useRef, useImperativeHandle, type PropsWithChildren, type Ref, type ForwardedRef, } from 'react';
import 'jb-checkbox';
import type { JBCheckboxWebComponent, SizeVariants } from 'jb-checkbox';
import { type EventProps, useEvents } from './events-hook.js';
import { useJBCheckboxAttribute, type JBCheckboxAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';

export function JBCheckbox(props: Props) {
  //otherProps contain size
  const { ref, disabled, error, message, name, required, validationList, value, children, onBeforeChange, onChange, ...otherProps } = props
  const element = useRef<JBCheckboxWebComponent>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <it's needed>
  useImperativeHandle(
    ref,
    () => (element.current??undefined),
    [element],
  );
  useJBCheckboxAttribute(element, { disabled, error, message, name, required, validationList, value });
  useEvents(element, { onBeforeChange, onChange });
  return (
    <jb-checkbox ref={element} {...otherProps}>
      {children}
    </jb-checkbox>
  );
};

JBCheckbox.displayName = "JBCheckbox";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'jb-checkbox': JBSwitchType;
    }
    interface JBSwitchType extends React.DetailedHTMLProps<React.HTMLAttributes<JBCheckboxWebComponent>, JBCheckboxWebComponent> {
      class?: string,
      name?: string,
      label?: string | null,
    }
  }
}
type JBCheckboxProps = {
  label?: string | null,
  size?: SizeVariants,
  ref?: ForwardedRef<JBCheckboxWebComponent|null|undefined>
}
export type Props = EventProps & PropsWithChildren<JBCheckboxProps> & JBCheckboxAttributes & JBElementStandardProps<JBCheckboxWebComponent, keyof EventProps & JBCheckboxAttributes>