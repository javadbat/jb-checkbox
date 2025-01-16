# jb-checkbox React component
jb-checkbox React component wrapper

codepen demo: <https://codepen.io/javadbat/pen/GRrzJeP>
in codeSandBox: [codeSandbox preview](https://3f63dj.csb.app/samples/jb-checkbox) for just see the demo and [codeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBCheckbox.tsx) if you want to see and play with code
## usage

```terminal
npm i jb-checkbox
```

```jsx
import {JBCheckbox} from 'jb-checkbox/react';
 <JBCheckbox label="checkbox sample" />
//  or if you want more customization:
 <JBCheckbox ><div slot="label">checkbox sample</div></JBCheckbox>
```
## get and set value

```jsx
const [value,setValue] = useState(false);
<JBCheckbox value={value} onChange={(e)=>setValue(e.target.value)}/>
```
## disable checkbox

```jsx
<JBCheckbox disabled />
```

## validation

jb-checkbox implement  [jb-validation](https://github.com/javadbat/jb-validation) inside to handle validation. so for more information you can read [jb-validation](https://github.com/javadbat/jb-validation) documentation.  
for simple usage you can set validation to your input:

```js
    const validationList = [
        {
            validator:(value)=>{
              //value is boolean
             return value == true;
            },
            message: 'you must check mark before continue'
        }
    ]
    const element = useRef();
    //return boolean of if all validation return true
  const result = element.current?.checkValidity()

  <JBCheckbox validationList={validationList} ref={element}/>
    
```
unlike other `jb design system` web-components `jb-checkbox` dont have any native wat to show validation error to the user and will only validate and return result for you to take an action as you like.

## customize styles:

Read [`jb-checkbox`](https://github.com/javadbat/jb-checkbox/) document for styling doc.

## Other Related Docs:

- see [jb-checkbox](https://github.com/javadbat/jb-checkbox/) if you want to use this component in react.

- see [All JB Design system Component List](https://github.com/javadbat/design-system/blob/main/docs/component-list.md) for more components.

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.


