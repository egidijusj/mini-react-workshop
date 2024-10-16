export type FunctionalComponent = (props: Props) => VDOMElement

export interface NativeVDOMElement {
  type: string | FunctionalComponent
  props: Props & ChildrenProp
}

export interface VDOMTextElement {
  type: 'TEXT_NODE'
  props: { nodeValue: string } & ChildrenProp
}

export type VDOMElement = string | NativeVDOMElement | VDOMTextElement

export type Props = Record<string, any> & ChildrenProp

interface ChildrenProp {
  children: VDOMElement[]
}

export interface Instance {
  element: VDOMElement
  node: Node
  childInstances: Array<Instance | null>
}

export const TEXT_NODE = 'TEXT_NODE'
