import { FormField, ToggleSwitch, RadioGroup } from '@wix/design-system'

export const RenderOptions = ({
  useReact,
  setUseReact,
  clearOutput,
  setClearOutput,
}: {
  useReact: boolean
  setUseReact: (value: boolean) => void
  clearOutput: boolean
  setClearOutput: (value: boolean) => void
}) => {
  return (
    <div>
      <FormField label="Renderer">
        <RadioGroup
          value={useReact ? 'react' : 'mini-react'}
          onChange={(value) => setUseReact(value === 'react')}
        >
          <RadioGroup.Radio value="mini-react">MiniReact™</RadioGroup.Radio>
          <RadioGroup.Radio value="react">React</RadioGroup.Radio>
        </RadioGroup>
      </FormField>
      <FormField
        label="Clear output before render"
        stretchContent={false}
        labelPlacement="top"
      >
        <ToggleSwitch
          size="small"
          checked={clearOutput}
          onChange={(e) => setClearOutput(e.target.checked)}
        />
      </FormField>
    </div>
  )
}
