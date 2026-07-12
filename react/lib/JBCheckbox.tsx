'use client';
import React, { useRef, useImperativeHandle, type PropsWithChildren, type Ref, type ForwardedRef, } from 'react';
import 'jb-checkbox';
import type { JBCheckboxWebComponent, SizeVariants } from 'jb-checkbox';
import { type EventProps, useEvents } from './events-hook.js';
import { useJBCheckboxAttribute, type JBCheckboxAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

export function JBCheckbox(props: Props) {
  //otherProps contain size
  const { ref, disabled, error, initialValue, message, name, required, validationList, value, children, onBeforeChange, onChange, ...otherProps } = props
  const element = useRef<JBCheckboxWebComponent>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <it's needed>
  useImperativeHandle(
    ref,
    () => (element.current??undefined),
    [element],
  );
  useJBCheckboxAttribute(element, { disabled, error, message, name, required, validationList });
  useEvents(element, { onBeforeChange, onChange });
  return (
    <jb-checkbox ref={element} value={value ?? false} initialValue={initialValue ?? false} {...otherProps}>
      {children}
    </jb-checkbox>
  );
};

JBCheckbox.displayName = "JBCheckbox";

type JBCheckboxProps = {
  label?: string | null,
  size?: SizeVariants,
  value?: boolean | null,
  initialValue?: boolean | null,
  ref?: ForwardedRef<JBCheckboxWebComponent|null|undefined>
}
export type Props = EventProps & PropsWithChildren<JBCheckboxProps> & JBCheckboxAttributes & JBElementStandardProps<JBCheckboxWebComponent, keyof EventProps & JBCheckboxAttributes>
