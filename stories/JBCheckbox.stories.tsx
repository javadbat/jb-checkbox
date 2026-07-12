import { JBCheckbox } from 'jb-checkbox/react';
import JBCheckboxTest from './JBCheckboxTestPage';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import type { JBCheckboxWebComponent } from '../dist/jb-checkbox';

const meta = {
  title: "Components/form elements/JBCheckbox",
  component: JBCheckbox,
} satisfies Meta<typeof JBCheckbox>;
export default meta;
type Story = StoryObj<typeof meta>;


export const Normal: Story = {
  args: {
    label: 'checkbox',
    onChange: (e) => { console.log('onChange', e.target.value); }
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
    required: true,
  }
};

export const Disabled: Story = {
  args: {
    label: 'disabled',
    disabled: true,
    onChange: (e) => { console.log('onChange', e.target.value); }
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<JBCheckboxWebComponent>('jb-checkbox');
    const wrapper = checkbox?.shadowRoot?.querySelector<HTMLElement>('.jb-checkbox-web-component');
    const onChange = fn();

    expect(checkbox).toBeTruthy();
    expect(wrapper).toBeTruthy();

    checkbox?.addEventListener('change', onChange);

    await waitFor(() => {
      expect(checkbox?.disabled).toBe(true);
      expect(wrapper?.tabIndex).toBe(-1);
    });

    await userEvent.click(wrapper!);

    expect(checkbox?.value).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
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
    onChange: (e) => { console.log('onChange', e.target.value); }
  }
};

export const WithError: Story = {
  args: {
    label: 'with error',
    error: 'error message passed from props',
  }
};
export const TestCheckbox: Story = {
  render: (args) => <JBCheckboxTest {...args}></JBCheckboxTest>,
  args: {
    label: 'check box',
  }
}
export const SizeVariants: Story = {
  render: () => {
    return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
      <JBCheckbox size='xl' label='Checkbox' />
      <JBCheckbox size='xl' label='Checkbox' value={true}/>
      <JBCheckbox size='xl' label='Checkbox' message='default checkbox message' value={true}/>

      <JBCheckbox size='lg' label='Checkbox' />
      <JBCheckbox size='lg' label='Checkbox' value={true}/>
      <JBCheckbox size='lg' label='Checkbox' message='default checkbox message' value={true}/>

      <JBCheckbox size='md' label='Checkbox' />
      <JBCheckbox size='md' label='Checkbox' value={true}/>
      <JBCheckbox size='md' label='Checkbox' message='default checkbox message' value={true}/>

      <JBCheckbox size='sm' label='Checkbox' />
      <JBCheckbox size='sm' label='Checkbox' value={true}/>
      <JBCheckbox size='sm' label='Checkbox' message='default checkbox message' value={true}/>

      <JBCheckbox size='xs' label='Checkbox' />
      <JBCheckbox size='xs' label='Checkbox' value={true}/>
      <JBCheckbox size='xs' label='Checkbox' message='default checkbox message' value={true}/>

    </div>
  )
  }
}
