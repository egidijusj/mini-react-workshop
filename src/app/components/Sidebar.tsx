import React from 'react'
import {
  Button,
  Box,
  Heading,
  TextButton,
  Divider,
  VerticalTabs,
  IconButton,
} from '@wix/design-system'
import { ChevronDown, ChevronUp, Dismiss } from '@wix/wix-ui-icons-common'
import { data, Section, Hint, Task } from '../content/examples'
import { usePersistentState } from '../utils/usePersistentState'

export const Sidebar = ({ setCode }: { setCode: (code: string) => void }) => {
  const [showSection, setShowSection] = usePersistentState<boolean>(
    'showSection',
    true,
  )
  const [activeSection, _setActiveSection] = usePersistentState<number>(
    'activeSection',
    0,
  )
  const setActiveSection = (section: number) => {
    _setActiveSection(section)
    setShowSection(true)
  }
  return (
    <Box direction="horizontal" padding={0} paddingLeft={'0px'}>
      <div style={{ width: '150px' }}>
        <VerticalTabs activeTabId={activeSection} onChange={setActiveSection}>
          {data.map((section, i) => (
            <VerticalTabs.TabItem key={i} id={i}>
              {section.title}
            </VerticalTabs.TabItem>
          ))}
        </VerticalTabs>
      </div>
      {showSection && (
        <div className="section-wrapper">
          <div className="fade"></div>
          <div className="section">
            <Box
              direction="horizontal"
              align="space-between"
              verticalAlign="middle"
              paddingBottom="10px"
            >
              <Box direction="vertical">
                <Heading size="extraTiny">
                  <span className="section-heading-t">WELCOME TO</span>
                </Heading>
                <Heading size="medium">{data[activeSection].title}</Heading>
              </Box>
              <IconButton
                size="small"
                skin="light"
                onClick={() => setShowSection(false)}
              >
                <Dismiss />
              </IconButton>
            </Box>
            <Divider />
            <Box height="10px" />
            {data[activeSection].description}

            {data[activeSection].tasks.map((task, j) => (
              <CollapsibleTask
                section={data[activeSection]}
                task={task}
                key={j}
                order={j + 1}
                setCode={setCode}
              />
            ))}
          </div>
        </div>
      )}
    </Box>
  )
}

const CollapsibleTask = ({
  task,
  setCode,
  order,
  section,
}: {
  task: Task
  setCode: (c: string) => void
  order: number
  section: Section
}) => {
  const [expanded, setExpanded] = usePersistentState<boolean>(
    `task|${section.title}|${task.title}`,
    false,
  )
  return (
    <div className="task">
      <div onClick={() => setExpanded(!expanded)}>
        <Box
          direction="horizontal"
          align="space-between"
          flexWrap="nowrap"
          marginBottom={'10px'}
          gap={'10px'}
        >
          <div onClick={() => setExpanded(!expanded)}>
            <Heading size="extraTiny">
              <span className="section-heading-t">TASK {order}</span>
            </Heading>
            <Heading size="tiny">{task.title}</Heading>
          </div>
          <Box direction="vertical" gap="5px">
            {task.codeSamples.map((code, k) => (
              <Button
                size="tiny"
                key={k}
                onClick={(e) => {
                  e.stopPropagation()
                  setCode(code)
                }}
              >
                Use sample {task.codeSamples.length > 1 ? '#' + (k + 1) : ''}
              </Button>
            ))}
          </Box>
        </Box>
      </div>

      {expanded && (
        <div>
          <Divider />
          <Box height="10px" />
          {task.description}
          <Box marginTop="10px" gap="20px" direction="vertical">
            {task.hints.map((hint, k) => (
              <CollapsibleHint
                section={section.title}
                key={k}
                order={task.hints.length > 1 ? k + 1 : null}
                hint={hint}
              />
            ))}
          </Box>
        </div>
      )}
    </div>
  )
}

const CollapsibleHint = ({
  section,
  hint,
  order,
}: {
  section: string
  hint: Hint
  order: number | null
}) => {
  const [expanded, setExpanded] = usePersistentState<boolean>(
    `hint|${section}|${order}`,
    false,
  )
  return (
    <Box direction="vertical" gap="10px">
      <TextButton
        onClick={() => setExpanded(!expanded)}
        size="tiny"
        suffixIcon={expanded ? <ChevronUp /> : <ChevronDown />}
      >
        <span>Show hint {order}</span>
      </TextButton>

      <div
        style={{ display: expanded ? 'block' : 'none' }}
        className="hint-content"
      >
        {hint}
      </div>
    </Box>
  )
}
