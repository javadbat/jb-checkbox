import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type {JBCheckboxEventType, JBCheckboxWebComponent} from 'jb-checkbox';

export type EventProps = {
    onChange?: (e: JBCheckboxEventType<Event>) => void,
    onBeforeChange?: (e: JBCheckboxEventType<Event>) => void,
}
export function useEvents(element:RefObject<JBCheckboxWebComponent>,props:EventProps){
  useEvent(element, 'before-change', props.onBeforeChange, true);
  useEvent(element, 'change', props.onChange, true);
}