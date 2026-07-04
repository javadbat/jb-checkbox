import React from 'react';
import { JBCheckbox } from 'jb-checkbox/react';
import type { Meta, StoryObj } from '@storybook/react';
import '../../../docs/styles/ant-design.css';
import '../../../docs/styles/aurora.css';
import '../../../docs/styles/bootstrap.css';
import '../../../docs/styles/candy.css';
import '../../../docs/styles/carbon.css';
import '../../../docs/styles/cupertino.css';
import '../../../docs/styles/fluent.css';
import '../../../docs/styles/forest.css';
import '../../../docs/styles/material.css';
import '../../../docs/styles/porcelain.css';
import '../../../docs/styles/sunset.css';
import '../../../docs/styles/terminal.css';
import './styles/style-ant-design.css';
import './styles/style-aurora.css';
import './styles/style-bootstrap.css';
import './styles/style-candy.css';
import './styles/style-carbon.css';
import './styles/style-cupertino.css';
import './styles/style-fluent.css';
import './styles/style-forest.css';
import './styles/style-material.css';
import './styles/style-porcelain.css';
import './styles/style-sunset.css';
import './styles/style-terminal.css';

const meta = {
  title: "Components/form elements/JBCheckbox/Style",
  component: JBCheckbox,
} satisfies Meta<typeof JBCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", className: "carbon-style carbon-checkbox" },
  { name: "Aurora", className: "aurora-style aurora-checkbox" },
  { name: "Forest", className: "forest-style forest-checkbox" },
  { name: "Sunset", className: "sunset-style sunset-checkbox" },
  { name: "Porcelain", className: "porcelain-style porcelain-checkbox" },
  { name: "Candy", className: "candy-style candy-checkbox" },
  { name: "Terminal", className: "terminal-style terminal-checkbox" },
  { name: "Material", className: "material-style material-checkbox" },
  { name: "Fluent", className: "fluent-style fluent-checkbox" },
  { name: "Bootstrap", className: "bootstrap-style bootstrap-checkbox" },
  { name: "Cupertino", className: "cupertino-style cupertino-checkbox" },
  { name: "Ant Design", className: "ant-design-style ant-checkbox" },
];

function CheckboxStyleSample({ className }: { className: string }) {
  return (
    <div style={{
      display: "grid",
      gap: "0.75rem",
      width: "100%",
    }}>
      <JBCheckbox className={className} label="Default option" message="Helper text"></JBCheckbox>
      <JBCheckbox className={className} label="Checked option" value={true}></JBCheckbox>
      <JBCheckbox className={className} label="Validation error" error="Required agreement"></JBCheckbox>
      <JBCheckbox className={className} label="Disabled option" disabled></JBCheckbox>
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
      gap: "1.25rem",
      alignItems: "start",
      width: "min(100%, 76rem)",
    }}>
      {styleSamples.map((sample) => (
        <section
          key={sample.className}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: " 0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
          className={sample.className.split(" ")[0]}
        >
          <div style={{
            width: "100%",
            color: "var(--jb-text-primary, #334155)",
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
          }}>
            {sample.name}
          </div>
          <CheckboxStyleSample className={sample.className} />
        </section>
      ))}
    </div>
  ),
};

export const Carbon: Story = {
  name: "Carbon",
  render: () => <CheckboxStyleSample className="carbon-style carbon-checkbox" />,
};

export const Aurora: Story = {
  name: "Aurora",
  render: () => <CheckboxStyleSample className="aurora-style aurora-checkbox" />,
};

export const Forest: Story = {
  name: "Forest",
  render: () => <CheckboxStyleSample className="forest-style forest-checkbox" />,
};

export const Sunset: Story = {
  name: "Sunset",
  render: () => <CheckboxStyleSample className="sunset-style sunset-checkbox" />,
};

export const Porcelain: Story = {
  name: "Porcelain",
  render: () => <CheckboxStyleSample className="porcelain-style porcelain-checkbox" />,
};

export const Candy: Story = {
  name: "Candy",
  render: () => <CheckboxStyleSample className="candy-style candy-checkbox" />,
};

export const Terminal: Story = {
  name: "Terminal",
  render: () => <CheckboxStyleSample className="terminal-style terminal-checkbox" />,
};

export const Material: Story = {
  name: "Material",
  render: () => <CheckboxStyleSample className="material-style material-checkbox" />,
};

export const Fluent: Story = {
  name: "Fluent",
  render: () => <CheckboxStyleSample className="fluent-style fluent-checkbox" />,
};

export const Bootstrap: Story = {
  name: "Bootstrap",
  render: () => <CheckboxStyleSample className="bootstrap-style bootstrap-checkbox" />,
};

export const Cupertino: Story = {
  name: "Cupertino",
  render: () => <CheckboxStyleSample className="cupertino-style cupertino-checkbox" />,
};

export const AntDesign: Story = {
  name: "Ant Design",
  render: () => <CheckboxStyleSample className="ant-design-style ant-checkbox" />,
};
