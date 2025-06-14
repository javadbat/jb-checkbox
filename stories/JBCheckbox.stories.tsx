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
    label: 'چک',
    onChange: (e) => { console.log('onChange', e.target.value);}
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


export const TestCheckbox: Story = {
  render:(args) => <JBCheckboxTest {...args}></JBCheckboxTest>,
  args: {
    label: 'چک باکس',
  }
}