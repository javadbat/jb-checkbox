import { JBCheckbox } from 'jb-checkbox/react';
import { JBButton } from 'jb-button/react';
import JBCheckboxTest from './JBCheckboxTestPage';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import type { JBCheckboxWebComponent } from 'jb-checkbox';
import { useRef } from 'react';

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

export const ImperativeMethods: Story = {
  args: {
    label: 'Accept terms',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<JBCheckboxWebComponent>('jb-checkbox');
    const wrapper = checkbox?.shadowRoot?.querySelector<HTMLElement>('.jb-checkbox-web-component');

    expect(checkbox).toBeTruthy();
    expect(wrapper).toBeTruthy();

    await waitFor(() => {
      expect(checkbox?.required).toBe(true);
      expect(checkbox?.checkValidity()).toBe(false);
    });

    expect(checkbox?.reportValidity()).toBe(false);

    await userEvent.click(wrapper!);

    expect(checkbox?.value).toBe(true);
    expect(checkbox?.checkValidity()).toBe(true);

    checkbox?.focus();
    expect(checkbox?.shadowRoot?.activeElement).toBe(wrapper);
  }
};

export const CancelableEvents: Story = {
  args: {
    label: 'Accept terms',
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<JBCheckboxWebComponent>('jb-checkbox');
    const wrapper = checkbox?.shadowRoot?.querySelector<HTMLElement>('.jb-checkbox-web-component');
    const onBeforeChange = fn((event: Event) => event.preventDefault());
    const onChange = fn();

    expect(checkbox).toBeTruthy();
    expect(wrapper).toBeTruthy();

    checkbox?.addEventListener('before-change', onBeforeChange);
    checkbox?.addEventListener('change', onChange);

    await userEvent.click(wrapper!);

    expect(onBeforeChange).toHaveBeenCalledOnce();
    expect(onBeforeChange.mock.calls[0][0].cancelable).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    expect(checkbox?.value).toBe(false);

    checkbox?.removeEventListener('before-change', onBeforeChange);
    await userEvent.click(wrapper!);

    expect(onChange).toHaveBeenCalledOnce();
    expect(checkbox?.value).toBe(true);
  }
};

export const InitialValue: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBCheckbox {...args} />
        <JBButton onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial value',
    initialValue: true,
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<JBCheckboxWebComponent>('jb-checkbox');
    const wrapper = checkbox?.shadowRoot?.querySelector<HTMLElement>('.jb-checkbox-web-component');
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(checkbox).toBeTruthy();
    expect(wrapper).toBeTruthy();
    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      expect(checkbox?.initialValue).toBe(true);
      expect(checkbox?.value).toBe(true);
      expect(checkbox?.checked).toBe(true);
      expect(checkbox?.isDirty).toBe(false);
    });

    // A canceled change must restore the assignment latch as well as value.
    checkbox!.addEventListener('change', (event) => event.preventDefault(), { once: true });
    await userEvent.click(wrapper!);

    expect(checkbox?.value).toBe(true);
    expect(checkbox?.checked).toBe(true);
    expect(checkbox?.isDirty).toBe(false);

    checkbox!.initialValue = false;

    expect(checkbox?.value).toBe(false);
    expect(checkbox?.isDirty).toBe(false);

    checkbox!.initialValue = true;
    await userEvent.click(wrapper!);

    expect(checkbox?.value).toBe(false);
    expect(checkbox?.checked).toBe(false);
    expect(checkbox?.isDirty).toBe(true);

    checkbox!.initialValue = true;

    expect(checkbox?.value).toBe(false);
    expect(checkbox?.isDirty).toBe(true);

    await userEvent.click(resetButton!);

    expect(checkbox?.value).toBe(true);
    expect(checkbox?.checked).toBe(true);
    expect(checkbox?.initialValue).toBe(checkbox?.value);
    expect(checkbox?.isDirty).toBe(false);

    checkbox!.initialValue = false;

    expect(checkbox?.value).toBe(false);
    expect(checkbox?.checked).toBe(false);
    expect(checkbox?.isDirty).toBe(false);
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    label: 'value takes precedence',
    initialValue: false,
    value: true,
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<JBCheckboxWebComponent>('jb-checkbox');

    await waitFor(() => {
      expect(checkbox?.initialValue).toBe(false);
      expect(checkbox?.value).toBe(true);
      expect(checkbox?.checked).toBe(true);
      expect(checkbox?.isDirty).toBe(true);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    label: 'explicit null value',
    initialValue: true,
    value: null,
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector<JBCheckboxWebComponent>('jb-checkbox');

    await waitFor(() => {
      expect(checkbox?.initialValue).toBe(true);
      expect(checkbox?.value).toBe(false);
      expect(checkbox?.checked).toBe(false);
      expect(checkbox?.isDirty).toBe(true);
    });
  },
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
