import { Box, Button, Dropdown, Heading } from '@wix/design-system'
import { Play } from '@wix/wix-ui-icons-common'

export type Renderer = 'react' | 'mini-react'

export const InputHeader = ({
  renderer,
  onRunClick,
  onRendererChange,
}: {
  renderer: Renderer
  onRunClick: () => void
  onRendererChange: (renderer: 'react' | 'mini-react') => void
}) => {
  return (
    <Heading size="medium">
      <Box verticalAlign="middle" align="space-between" direction="horizontal">
        JSX Input
        <Box
          verticalAlign="middle"
          align="space-between"
          direction="horizontal"
          gap={'10px'}
        >
          <Dropdown
            size="small"
            onSelect={(value) => onRendererChange(value.id as Renderer)}
            selectedId={renderer}
            options={[
              { id: 'mini-react', value: 'MiniReact™' },
              { id: 'react', value: 'React' },
            ]}
          ></Dropdown>
          <Button size="small" onClick={onRunClick} prefixIcon={<Play />}>
            Run code
          </Button>
        </Box>
      </Box>
    </Heading>
  )
}
