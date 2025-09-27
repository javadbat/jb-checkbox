import React from 'react';
import { JBCheckbox, Props } from 'jb-checkbox/react';
import JBCheckboxTest from './JBCheckboxTestPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<Props> = {
  title: "Components/form elements/JBCheckbox",
  component: JBCheckbox,
};
export default meta;
type Story = StoryObj<typeof JBCheckbox>;


export const Normal: Story = {
  args: {
    label: 'checkbox',
    onChange: (e) => { console.log('onChange', e.target.value);}
  }
};
export const WithMessage: Story = {
  args: {
    label: 'Checkbox Label',
    message: 'message of checkbox'
  }
};
export const Required: Story = {
  args: {
    label: 'required checkbox',
    message: 'please check and then uncheck the checkbox to see validation error',
    required:true,
  }
};

export const Disabled: Story = {
  args: {
    label: 'disabled',
    disabled: true,
    onChange: (e) => { console.log('onChange',e.target.value); }
  }

};

export const DisabledTrue: Story = {
  args: {
    label: 'disabled with true value',
    value: true,
    disabled: true,
    onChange: (e) => { console.log('onChange', e.target.value); }
  }
};

export const ChildrenLabel: Story = {
  args: {
    children: <div style={{ color: 'blue' }} slot="label">label in children</div>,
    onChange: (e) => { console.log('onChange',e.target.value); }
  }
};

export const WithError: Story = {
  args: {
    label: 'with error',
    error: 'error message passed from props',
  }
};
export const TestCheckbox: Story = {
  render:(args) => <JBCheckboxTest {...args}></JBCheckboxTest>,
  args: {
    label: 'check box',
  }
}