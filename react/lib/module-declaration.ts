import type { JBCheckboxWebComponent } from 'jb-checkbox';

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
