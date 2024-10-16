import { FormField, Heading, ToggleSwitch } from '@wix/design-system'

export const RenderSettings = ({
  clearOutput,
  onClearOutputChange,
}: {
  clearOutput: boolean
  onClearOutputChange: (value: boolean) => void
}) => {
  return (
    <>
      <Heading size="tiny">Render Settings</Heading>
      <FormField
        label="Clear previous render output when running code"
        stretchContent={true}
        labelPlacement="left"
      >
        <ToggleSwitch
          size="small"
          checked={clearOutput}
          onChange={(e) => onClearOutputChange(e.target.checked)}
        />
      </FormField>
    </>
  )
}
