import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-checkbox",
    path: "./lib/jb-checkbox.ts",
    outputPath: "./dist/jb-checkbox.js",
    umdName: "JBCheckbox",
    external: ["jb-validation", "jb-form", "jb-core", "jb-core/theme"],
    globals: {
      "jb-validation": "JBValidation",
      "jb-form": "JBForm",
      "jb-core": "JBCore",
      "jb-core/theme":"JBCoreTheme"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-checkbox-react",
    path: "./react/lib/JBCheckbox.tsx",
    outputPath: "./react/dist/JBCheckbox.js",
    external: [ "react", "jb-checkbox","jb-core"],
    globals: {
      react: "React",
      "jb-checkbox": "JBCheckbox",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
    },
    umdName:"JBCheckboxReact",
    dir:"./react"
  },
];