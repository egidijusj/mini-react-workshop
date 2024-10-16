import { Text } from '@wix/design-system'
import { Confirm, Dismiss } from '@wix/wix-ui-icons-common'
import type { RenderStats as RenderStatsType } from '../utils/observer'

const Badge = ({
  value,
  label,
  expectedValue,
}: {
  value: number
  label: string
  expectedValue: number
}) => {
  return (
    <div className="stats-badge">
      {value === expectedValue ? (
        <span className="icon-green">
          <Confirm size="18px" />
        </span>
      ) : (
        <span className="icon-red">
          <Dismiss size="18px" />
        </span>
      )}
      <Text size="tiny">
        <b>{value}</b> {label}
      </Text>
    </div>
  )
}

export const RenderStats = ({
  stats,
  expectedStats,
}: {
  stats: RenderStatsType
  expectedStats: RenderStatsType
}) => {
  return (
    <div className="stats-container">
      <Badge
        value={stats.nodesAdded}
        label="nodes added"
        expectedValue={expectedStats.nodesAdded}
      />
      <Badge
        value={stats.nodesRemoved}
        label="nodes removed"
        expectedValue={expectedStats.nodesRemoved}
      />
      <Badge
        value={stats.attributesChanged}
        label="attributes changed"
        expectedValue={expectedStats.attributesChanged}
      />
      <Badge
        value={stats.attributesAdded}
        label="attributes added"
        expectedValue={expectedStats.attributesAdded}
      />
      <Badge
        value={stats.attributesRemoved}
        label="attributes removed"
        expectedValue={expectedStats.attributesRemoved}
      />
      <Badge
        value={stats.textNodesChanged}
        label="text nodes changed"
        expectedValue={expectedStats.textNodesChanged}
      />
    </div>
  )
}
