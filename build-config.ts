import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-checkbox",
    path: "./lib/jb-checkbox.ts",
    outputPath: "./dist/jb-checkbox.js",
    umdName: "JBCheckbox",
    external: ["jb-validation", "jb-form"],
    globals: {
      "jb-validation": "JBValidation",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-checkbox-react",
    path: "./react/lib/JBCheckbox.tsx",
    outputPath: "./react/dist/JBCheckbox.js",
    external: ["prop-types", "react", "jb-checkbox"],
    globals: {
      react: "React",
      "jb-checkbox": "JBCheckbox",
      "prop-types": "PropTypes",
    },
    umdName:"JBCheckboxReact",
    dir:"./react"
  },
];