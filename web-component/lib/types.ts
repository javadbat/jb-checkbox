import type { JBCheckboxWebComponent } from "./jb-checkbox";
import type {EventTypeWithTarget} from 'jb-core';

export type ElementsObject = {
  componentWrapper:HTMLDivElement,
  svgWrapper:HTMLDivElement,
  svg:SVGAElement,
  label:HTMLDivElement,
  message:HTMLDivElement
}
export type ValidationValue = boolean;
export type JBCheckboxEventType<TEvent> = EventTypeWithTarget<TEvent,JBCheckboxWebComponent>;
export type SizeVariants = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorVariants = 'primary' | 'secondary' | 'positive' | 'danger'| 'warning'| 'light' | 'dark';
export type StyleVariants = 'solid' | 'outline' | 'filled-outline';