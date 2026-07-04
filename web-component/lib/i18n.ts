import {JBDictionary} from 'jb-core/i18n';
export type JBCheckboxDictionary = {
  requiredMessage:string
}

/**
 * dictionary of jb checkbox. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-checkbox'
 * dictionary.setLanguage("fr", {
 *  requiredMessage: "message in french",
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBCheckboxDictionary>({
  "fa":{
    requiredMessage:"چک میبایست فعال شود"
  },
  "en":{
    requiredMessage:"must be checked"
  }
});