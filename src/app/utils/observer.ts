export interface RenderStats {
  nodesAdded: number
  nodesRemoved: number
  attributesChanged: number
  attributesAdded: number
  attributesRemoved: number
  textNodesChanged: number
}

export const getEmptyStats = (): RenderStats => ({
  nodesAdded: 0,
  nodesRemoved: 0,
  attributesChanged: 0,
  attributesAdded: 0,
  attributesRemoved: 0,
  textNodesChanged: 0,
})

const countAddedNodes = (nodes: NodeList, visited: Set<Node>): number => {
  let count = 0
  nodes.forEach((node) => {
    if (!visited.has(node)) {
      count++
      visited.add(node)
    }
    if (node.childNodes.length) {
      count += countAddedNodes(node.childNodes, visited)
    }
  })
  return count
}

export const setUpObserver = (
  outputWrapper: HTMLElement,
  onChange: (stats: RenderStats) => void,
) => {
  const mutationCallback = function (mutationsList: MutationRecord[]) {
    const newStats = getEmptyStats()

    const visitedNodes = new Set<Node>()
    mutationsList.forEach((mutation) => {
      switch (mutation.type) {
        case 'childList': {
          newStats.nodesAdded += countAddedNodes(
            mutation.addedNodes,
            visitedNodes,
          )
          newStats.nodesRemoved += mutation.removedNodes.length
          break
        }
        case 'attributes':
          if (mutation.oldValue) {
            const attrExists = (mutation.target as HTMLElement).getAttribute(
              mutation.attributeName!,
            )
            if (attrExists) {
              newStats.attributesChanged += 1
            } else {
              newStats.attributesRemoved += 1
            }
          } else {
            newStats.attributesAdded += 1
          }
          break
        case 'characterData':
          newStats.textNodesChanged += 1
          break
        default:
          break
      }
    })
    onChange(newStats)
  }

  const observer = new MutationObserver(mutationCallback)

  observer.observe(outputWrapper, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  })

  return observer
}
