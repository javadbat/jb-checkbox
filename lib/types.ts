import type { JBCheckboxWebComponent } from "./jb-checkbox";
import type {EventTypeWithTarget} from 'jb-core';

export type ElementsObject = {
  componentWrapper:HTMLDivElement,
  svgWrapper:HTMLDivElement,
  svg:SVGAElement,
  label:HTMLDivElement
}
export type ValidationValue = boolean;
export type JBCheckboxEventType<TEvent> = EventTypeWithTarget<TEvent,JBCheckboxWebComponent>;