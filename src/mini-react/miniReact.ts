import { Props, VDOMElement, FunctionalComponent } from './types'

export const miniCreateElement = (
  type: string | FunctionalComponent,
  props: Props | null,
  ...children: VDOMElement[]
): VDOMElement => {
  throw new Error('Todo!')
}

export const miniRender = (
  element: VDOMElement,
  container: HTMLElement,
): void => {
  throw new Error('Todo!')
}

export const unmount = (container: HTMLElement): void => {
  Array.from(container.childNodes).forEach((node) => {
    node.remove()
  })
}

export const useState = <T>(initialState: T): [T, (newState: T) => void] => {
  throw new Error('Todo!')
}

export const useEffect = (callback: () => void, dependencies: any[]): void => {
  throw new Error('Todo!')
}
