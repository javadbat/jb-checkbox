import { JBCheckboxWebComponent, type ValidationValue } from "jb-checkbox";
import { type ValidationItem } from "jb-validation";
import { RefObject, useEffect } from "react";

export type JBCheckboxAttributes = {
  name?: string,
  value?: boolean | null | undefined,
  message?: string | null | undefined,
  error?:string | null | undefined
  validationList?: ValidationItem<ValidationValue>[] | null,
  disabled?: boolean,
  required?: boolean,
}
export function useJBCheckboxAttribute(element: RefObject<JBCheckboxWebComponent>, props: JBCheckboxAttributes) {


  useEffect(() => {
    if (props.name) {
      element?.current?.setAttribute('name', props.name || '');
    } else {
      element?.current?.removeAttribute('name');
    }
  }, [props.name]);

  useEffect(() => {
    props.message ? element.current.setAttribute('message', props.message) : element.current.removeAttribute('message');
  }, [props.message])

  useEffect(() => {
    if (element && element.current) {
      element.current.validation.list = props.validationList || [];
    }
  }, [props.validationList]);

  useEffect(() => {
    if (typeof props.disabled == "boolean" && props.disabled) {
      element?.current?.setAttribute('disabled', '');
    } else {
      element?.current?.removeAttribute('disabled');
    }
  }, [props.disabled]);

  useEffect(() => {
    if (typeof props.required === "string") {
      element?.current?.setAttribute('required', props.required);
    }
    if (typeof props.required === "boolean") {
      props.required ? element?.current?.setAttribute('required', '') : element?.current?.removeAttribute('required');
    }
  }, [props.required]);

  useEffect(() => {
    if (element.current && props.value !== null && props.value !== undefined) {
      element.current.value = props.value;
    }
  }, [props.value]);

  useEffect(() => {
    if (props.error) {
      element?.current?.setAttribute('error', props.error);
    } else {
      element?.current?.removeAttribute('error');
    }
  }, [props.error]);
}