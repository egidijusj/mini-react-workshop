import { Box, Heading } from '@wix/design-system'
import { Renderer } from './InputHeader'
import { RenderStats } from './RenderStats'
import { RenderStats as RenderStatsType } from '../utils/observer'

export const OutputContainer = ({
  renderer,
  reactStats,
  miniReactStats,
}: {
  renderer: Renderer
  reactStats: RenderStatsType
  miniReactStats: RenderStatsType
}) => {
  return (
    <Box
      direction="vertical"
      alignContent="space-between"
      align="space-between"
    >
      <div
        id="react-output"
        className="output"
        style={{ display: renderer === 'react' ? 'block' : 'none' }}
      ></div>
      <div
        id="custom-output"
        className="output"
        style={{ display: renderer === 'react' ? 'none' : 'block' }}
      ></div>
      <div>
        <Box height={'20px'} />
        <Heading size="tiny">Render Stats</Heading>
        <RenderStats
          stats={renderer === 'react' ? reactStats : miniReactStats}
          expectedStats={reactStats}
        />
      </div>
    </Box>
  )
}
