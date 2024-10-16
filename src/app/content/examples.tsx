import { Box, Text } from '@wix/design-system'
import { CodeBlock } from '../components/CodeBlock'

export interface Section {
  title: string
  description: React.ReactElement
  tasks: Task[]
}

export interface Task {
  title: string
  codeSamples: CodeSample[]
  description: React.ReactElement
  hints: Hint[]
}

type CodeSample = string
export type Hint = React.ReactElement

export const data: Section[] = [
  {
    title: 'Introduction',
    description: (
      <Box direction="vertical" gap={'10px'}>
        <Text>
          Welcome! In this workshop we will attempt to build{' '}
          <CodeBlock>MiniReact™</CodeBlock> - a minimal and simplified
          implementation of React library.
        </Text>
        <Text weight="bold">Worflow</Text>
        <Text>
          The skeleton implementation of <CodeBlock>MiniReact™</CodeBlock>{' '}
          resides in the source code of this app, under{' '}
          <CodeBlock>src/mini-react/index.ts</CodeBlock>. It exports several
          functions that are used in the rendering process. There should be no
          need for you to change any code outside of{' '}
          <CodeBlock>src/mini-react/</CodeBlock> folder.
        </Text>
        <Text>
          You can use this web app to get insights & check on your progress. On
          the left sidebar you will find sections with tasks to solve. After
          reading through a task description, you may click on Use Sample button
          to add the sample jsx code to the JSX Input text area and then run the
          sample against your <CodeBlock>MiniReact™</CodeBlock> implementation
          using Run Code button. Feel free to use your own jsx as well. There is
          also an option to switch the renderers between{' '}
          <CodeBlock>MiniReact™</CodeBlock> and <CodeBlock>React</CodeBlock> in
          case you need to see how production React would render the example.
        </Text>
        <Text>
          On the right side there is output section, which displays the DOM
          nodes created during rendering process. Feel free to inspect them to
          better understand what your implementation of{' '}
          <CodeBlock>MiniReact™</CodeBlock> actually does. Below it you will
          find some stats of DOM operations made during each render.
        </Text>

        <Text>Good luck!</Text>
      </Box>
    ),
    tasks: [],
  },
  {
    title: 'Naive rendering',
    description: (
      <Box direction="vertical" gap="10px">
        <Text>
          In this section we will attempt to render DOM elements without
          thinking too much about performance and optimizations.
        </Text>
        <Text>
          First, we should familiarize with the concept of Virtual DOM. You can
          read about it{' '}
          <a href="https://www.geeksforgeeks.org/reactjs-virtual-dom/">
            in this post
          </a>
          . In short, Virtual DOM is a lightweight copy of the actual DOM for
          the purpose of optimizing rendering. Manipulating real DOM is
          expensive in terms of performance, so React uses Virtual DOM to
          minimize the number of operations on the actual DOM.
        </Text>
        <Text>
          Before starting work on the renderer itself, you will need to
          implement <CodeBlock>miniCreateElement</CodeBlock>. This function will
          be invoked after Babel transpiles JSX into regular JS code, passing it
          the type of element to render, its props and children. Feel free to
          choose any shape you want for the virtual DOM. You can also use the
          provided <CodeBlock>VDOMElement</CodeBlock> interface which describes
          an object with two properties - type & props, the latter also
          including children. The type property refers to the type of the DOM
          node to render (e.g. 'div', 'span', 'a'), but as we'll discover later
          on, it can also be function.
        </Text>
        <Text>
          The
          <CodeBlock>miniRender</CodeBlock> function receives two arguments - a
          virtual DOM node and actual DOM node which is the container. The
          purpose of this function is to convert the virtual DOM node into
          actual DOM nodes and append them to the given container.
        </Text>
        <Text listStyle="circle">
          The goal of this section is to achieve the following:
          <ul>
            <li>Convert virtual DOM nodes to actual DOM nodes</li>
            <li>Append the created DOM nodes to container</li>
            <li>
              Add virtual DOM node's props to actual DOM node attributes, event
              listeners and style rules
            </li>
          </ul>
        </Text>
      </Box>
    ),
    tasks: [
      {
        title: 'Single element',
        codeSamples: ['<hr />'],
        description: <Text>Render a single DOM node</Text>,
        hints: [
          <Text>
            To create a new DOM node, use{' '}
            <CodeBlock>document.createElement(elementType)</CodeBlock>
          </Text>,
          <Text>
            Having created a node it does not automatically get displayed in the
            browser. You need to attach it to existing DOM node. For that, use{' '}
            <CodeBlock>parentNode.append(childNode)</CodeBlock>
          </Text>,
        ],
      },
      {
        title: 'Single element with text',
        codeSamples: ['<span>Hello, world!</span>'],
        description: <Text>Render a single DOM node with text content</Text>,
        hints: [
          <Text>
            The virtual DOM node passed to <CodeBlock>miniRender</CodeBlock>{' '}
            contains <CodeBlock>children</CodeBlock> prop, which is an array of
            child nodes. Your code must be adjusted to render not only the
            top-level virtual DOM element, but also its children. However, when
            rendering children, you should append them to the created node, not
            the container that you received initially in the{' '}
            <CodeBlock>miniRender</CodeBlock> function.
          </Text>,
          <Text>
            There are several ways to handle children which are strings. You can
            either directly append it to the container{' '}
            <CodeBlock>parentNode.append(stringValue)</CodeBlock> or create a
            text node using{' '}
            <CodeBlock>document.createTextNode(stringValue)</CodeBlock> and
            append resulting node to the parent.
          </Text>,
        ],
      },
      {
        title: 'Element with nested children',
        codeSamples: ['<div><span>Span 1</span><br/><span>Span 2</span></div>'],
        description: <Text>Render nested DOM nodes</Text>,
        hints: [
          <Text>
            Chances are this code example is already working after you
            implemented the previous step. If it does not, keep in mind that you
            rendering must work for arbitrarily large trees of components - your
            code cannot assume that there will be only a single level of nested
            children. The easiest way to handle this is to recursively call the{' '}
            <CodeBlock>miniRender</CodeBlock> function.
          </Text>,
        ],
      },
      {
        title: 'Attributes',
        codeSamples: ['<a href="https://wix.com" title="Wix">link</a>'],
        description: <Text>Add attributes to rendered DOM node</Text>,
        hints: [
          <Text>
            Virtual DOM element's props, besides a few exceptions such as{' '}
            <CodeBlock>children</CodeBlock>, directly map to DOM node's
            attributes. DOM API provides a method{' '}
            <CodeBlock>node.setAttribute(name, value)</CodeBlock> to add/modify
            an attribute.
          </Text>,
        ],
      },
      {
        title: 'Style',
        codeSamples: [
          '<div style={{ background: "red" }}>I am colourful</div>',
        ],
        description: <Text>Add styles to rendered DOM node</Text>,
        hints: [
          <Text>
            Style is a bit special compared to attributes. First of all, in
            React, style prop is passed as an object of key-value pairs. You
            need to iterate over the object and set each key-value pair as a
            style rule. DOM API provides a way to set style rules via{' '}
            <CodeBlock>node.style.styleProp = styleValue</CodeBlock>
          </Text>,
        ],
      },
      {
        title: 'Event listener',
        codeSamples: ['<div onClick={() => alert("clicked")}>Click me</div>'],
        description: <Text>Add event listeners to rendered DOM node</Text>,
        hints: [
          <Text>
            Event listeners are another special case of a prop. To set an event
            listener, you can use DOM API method{' '}
            <CodeBlock>node.addEventListener(eventType, listener)</CodeBlock>
          </Text>,
          <Text>
            Keep in mind that in react ecosystem, event listener props are
            typically named as <CodeBlock>"on" + "EventType"</CodeBlock>, e.g.
            event types such as "click", "mouseover" are represented by prop
            names "onClick", "onMouseOver". Your code must transform the prop
            name into a valid event type by stripping the "on" prefix and
            converting the remaining string to lowercase.
          </Text>,
        ],
      },
    ],
  },
  {
    title: 'Components',
    description: (
      <Box direction="vertical" gap={'10px'}>
        <Text>
          In this section we will add support for functional components.
        </Text>
        <Text>
          When you attempt to render a custom functional component,
          <CodeBlock>miniCreateElement</CodeBlock> will receive a function as
          the type of the element. The <CodeBlock>miniCreateElement</CodeBlock>{' '}
          function signature should be adjusted to ensure it can accept both
          strings and functions as the type.
        </Text>
      </Box>
    ),
    tasks: [
      {
        title: 'Simple component',
        codeSamples: [
          `
const Comp = () => {
  return <h2>Hello World</h2>
}
<Comp />

`,
        ],
        description: (
          <Text>Render a component with single HTML tag inside</Text>
        ),
        hints: [
          <Text>
            Your implementation of <CodeBlock>miniRender</CodeBlock> needs to
            handle virtual DOM elements with a type that is function. To do
            that, you can simply invoke the function during render to get the
            component's children hierarchy and then render it recursively in the
            same way you did for previous cases.
          </Text>,
        ],
      },
      {
        title: 'Component with props',
        codeSamples: [
          `
const Comp = ({ content }) => {
  return <h2>{content}</h2>
}
<Comp content="Hello World"/>
`,
        ],
        description: <Text>Render a component with props</Text>,
        hints: [],
      },
      {
        title: 'Component with children',
        codeSamples: [
          `
const Comp = ({ children }) => {
  return <div>{children}</div>
}
<Comp><h2>Hello world</h2></Comp>
`,
        ],
        description: <Text>Render a component with children</Text>,
        hints: [
          <Text>
            When your functional component is transpiled from JSX, the children
            elements are passed to <CodeBlock>miniCreateElement</CodeBlock> as
            an array. Make sure that your implementation of the function
            flattens the children when returning virtual DOM element.
          </Text>,
        ],
      },
      {
        title: 'Component with children prop',
        codeSamples: [
          `
const Comp = ({ children }) => {
  return <div>{children}</div>
}
  <Comp children={
    <h2>Hello world</h2>}>
  </Comp>
`,
        ],
        description: <Text>Render a component with children prop</Text>,
        hints: [
          <Text>
            The children in this example are passed not as the third argument to{' '}
            <CodeBlock>miniCreateElement</CodeBlock> function, but rather as a
            prop. Your code should handle both cases when passing children prop
            to component function.
          </Text>,
          <Text>
            In some cases the children property will be a VDOM element, not an
            array of VDOM elements. Implementation should handle that as well.
          </Text>,
        ],
      },
      {
        title: 'Nested components',
        codeSamples: [
          `
const ChildComp = ({ content }) =>
  <span>{content}</span>;

const CompWithChildren = ({ children }) =>
  <div>Hello {children}</div>;

<CompWithChildren>
  <ChildComp content="world" />
</CompWithChildren>
`,
        ],
        description: (
          <Text>
            Render a component with another component inside. It is very likely
            that this sample is already working if you correctly implemented the
            previous two.
          </Text>
        ),
        hints: [],
      },
    ],
  },
  {
    title: 'Hooks',
    description: (
      <Box direction="vertical" gap={'10px'}>
        <Text>
          In this section we will add support <CodeBlock>useState</CodeBlock>{' '}
          and <CodeBlock>useEffect</CodeBlock> hooks.
        </Text>
        <Text>
          Up until now we relied on external consumer calls to render virtual
          DOM elements. However, with the addition of hooks, there is a need to
          re-render the component tree within the{' '}
          <CodeBlock>MiniReact™</CodeBlock> implementation. It means we will
          need to keep a reference to container and the element last render. The
          simplest way to do that is to create a global variable and update it
          during <CodeBlock>miniRender</CodeBlock> call. Note: since this
          function is called recursively, the last render information will be
          overwritten on each call when rendering a single component tree. To
          address that, you may need to introduce another function that will
          call itself recursively, while the existing function will just capture
          render arguments and call the new function.
        </Text>
        <Text>
          Whenever the state changes, we will use those references to re-render
          the component tree with the new state.
        </Text>
        <Text>
          To keep track of the state, we will need another global variable, e.g.{' '}
          <CodeBlock>appState: any[]</CodeBlock>, to reference the current state
          for every <CodeBlock>useState</CodeBlock> call. Additionally, we will
          need a cursor to keep track of the current state index. During
          rendering, when <CodeBlock>useState</CodeBlock> is invoked, we will
          either use state that was saved previously or initialize it with the
          initial state. After running the hook code, the state cursor needs to
          be incremented to ensure multiple hook invocations do not overwrite
          the same state.
        </Text>
      </Box>
    ),
    tasks: [
      {
        title: 'Single component with useState (state getter)',
        codeSamples: [
          `
const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>Count: {count}</span>
    </div>
  )
}
<Counter />
`,
        ],
        description: (
          <Text>
            Render a component which uses state from the useState hook
          </Text>
        ),
        hints: [
          <Text>
            To keep track of the components' state throughout app lifecycle, we
            will need a global variable, e.g.{' '}
            <CodeBlock>appState: any[]</CodeBlock>, to reference the current
            state for every <CodeBlock>useState</CodeBlock> call. Additionally,
            we will need a cursor to keep track of the current state index.
            During rendering, when <CodeBlock>useState</CodeBlock> is invoked,
            we will either use state that was saved previously or initialize it
            with the initial state. After running the hook code, the state
            cursor needs to be incremented to ensure multiple hook invocations
            do not overwrite the same state.
          </Text>,
        ],
      },
      {
        title: 'Single component with useState (state setter)',
        codeSamples: [
          `
const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
<Counter />
`,
        ],
        description: <Text>Render a component which uses setState</Text>,
        hints: [
          <Text>
            State setter function accepts a single argument - new state value.
            When the setter is called, the state should be updated in the
            appState under the cursor captured by hook closure and the component
            should be re-rendered.
          </Text>,
          <Text>
            The goal of re-render function is to clean up the DOM that was added
            during previous render, reset state cursor to initial value and then
            call <CodeBlock>miniRender</CodeBlock> function with element and
            container of the last render. It is convenient to reuse{' '}
            <CodeBlock>unmount</CodeBlock> function to clean up any previous
            DOM. Also keep in mind that appState should be preserved when
            re-rendering due to hook changes, but should be cleared when
            external unmount happens. One of the ways to achieve that is to
            assign current appState to a temporary variable in reRender function
            before calling unmount (which internally should reset all state
            variables to initial values), and then reset appState. Before
            re-rendering, appStateCursor should be reset to 0 so that hooks that
            will run during re-render can access correct state.
          </Text>,
        ],
      },
      {
        title: 'Multiple components with useState',
        codeSamples: [
          `
const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
<div>
  <Counter />
  <Counter />
</div>
`,
        ],
        description: <Text>Render multiple components with useState hook</Text>,
        hints: [],
      },
      {
        title: 'Single component with multiple useState',
        codeSamples: [
          `
const Counter = () => {
  const [name, setName] = useState('John')
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br/>
      <span>Name: {name}</span>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  )
}
<Counter />
`,
        ],
        description: (
          <Text>Render a component with several useState hooks</Text>
        ),
        hints: [],
      },
      {
        title: 'Nested component with useState',
        codeSamples: [
          `
const Wrapper = ({ children }) => {
  return (
    <div>
      <h2>Wrapper</h2>
      {children}
    </div>
  )
}
const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

<Wrapper><Counter /></Wrapper>
`,
        ],
        description: (
          <Text>
            Render a component hierarchy with a nested component using useState
            hook
          </Text>
        ),
        hints: [],
      },
      {
        title: 'Single component with useEffect',
        codeSamples: [
          `
const Timer = () => {
  const [time, setTime] = useState(Date.now())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <span>{new Date(time).toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit', second: '2-digit'})}</span>
    </div>
  )
}
<Timer />
`,
        ],
        description: <Text>Render a component with useEffect hook</Text>,
        hints: [
          <Text>
            Similarly to <CodeBlock>useState</CodeBlock>, the{' '}
            <CodeBlock>useEffect</CodeBlock> hooks and current hook should be
            tracked somewhere in global variables, e.g. with{' '}
            <CodeBlock>hooks: any[]</CodeBlock> and{' '}
            <CodeBlock>currentHook: number</CodeBlock>. When hook function is
            invoked, the implementation needs to check if it was already
            registered globally or not. If it was, you also need to check if
            hook's dependencies have changed since last run.
          </Text>,
          <Text>
            A hook needs to be executed when it's being invoked the first time
            or if its dependencies have changed. This necesitates to keep track
            of hook dependecies of previous run as well.
          </Text>,
          <Text>
            Hook callback may optionally return a clean up function. It should
            be invoked when the hook is re-run. Additionally, the hook should be
            cleaned up when the component is unmounted.
          </Text>,
        ],
      },
    ],
  },
  /*  {
    title: 'Optimizations',
    description: (
      <Box direction="vertical" gap={'10px'}>
        <Text>
          Congratulations! By this point, you have a working implementation of
          rendering library that is capable of displaying native HTML tags from
          virtual DOM elements. Good job!
        </Text>
        <Text>
          In this section we will try to focus on performance optimizations. If
          you uncheck <CodeBlock>Clear output before rendering</CodeBlock>{' '}
          checkbox and run any example above two times, you will see that the
          output is duplicated. This is because the naive rendering approach
          does not take into account the existing DOM nodes and always appends
          new nodes to the container. This is not only inefficient but also can
          lead to memory leaks and other issues. The checkbox was there to
          ensure that on each render the output is cleared before rendering new
          content.
        </Text>
        <Text>
          Let's keep the checkbox unchecked for the rest of this section.
        </Text>
        <Text>
          The goal of this section is to run all code samples twice and:
          <ul>
            <li>Persist information about the previous render</li>
            <li>
              Re-use as much existing DOM structure as possible, modifying only
              what actually changed
            </li>
            <li>Modify existing attributes and event listeners</li>
            <li>Remove listeners/attributes that are no longer present</li>
            <li>Add new listeners/attributes</li>
            <li>Modify text content</li>
          </ul>
        </Text>
        <Text>
          Additionally, we may make some use of the <CodeBlock>Stats</CodeBlock>{' '}
          section below the render output. It shows various statistics of DOM
          operations performed during the render. Ideally, if we render exactly
          the same content twice, the stats section should not indicate any
          changes in the DOM.
        </Text>
      </Box>
    ),
    tasks: [
      {
        title: 'Single element remains the same in multiple renders',
        codeSamples: ['<hr />'],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            First of all, <CodeBlock>miniRender</CodeBlock> function needs a way
            to compare the previous render with the current one. You might have
            already noticed an uninitialized variable
            <CodeBlock>rootInstance</CodeBlock>. Its purpose is exactly that -
            it should be updated after every render with render result. The
            render result is an object with 3 properties - node (DOM node),
            element (virtual DOM node) and childInstances (array of instance
            objects for every child element of rendered element). The
            rootInstance should be updated with the new render result after
            every render.
          </Text>,
          <Text>
            Assuming you save the previous render result in the rootInstance, on
            next render you can compare its element property with the new
            virtual DOM element of the second render. If element types match,
            you don't need to create a new node and keep the existing in place.
          </Text>,
          <Text listStyle="circle">
            In total, there are 4 possible scenarios during rendering:
            <ul>
              <li>
                <CodeBlock>rootInstance</CodeBlock> is null, meaning, this is
                the first rendering of the app and no DOM nodes exist that we
                could re-use, therefore we have to do everything from scratch.
              </li>
              <li>
                <CodeBlock>element</CodeBlock> is null, meaning, we rendered the
                element previously, but on second render it is no longer
                present, therefore the associated DOM node that we have
                reference to in <CodeBlock>rootInstance.node</CodeBlock> should
                be removed.
              </li>
              <li>
                Both <CodeBlock>rootInstance</CodeBlock> and{' '}
                <CodeBlock>element</CodeBlock> are not null and their types
                match. It means we are attempting to render same HTML tag - so
                no need to create any new DOM nodes.
              </li>
              <li>
                Same as above, but the types do not match, meaning we should
                create a new DOM node and replace it with the old one.
              </li>
            </ul>
          </Text>,
        ],
      },
      {
        title: 'Single element -> No element',
        codeSamples: ['<hr />', ''],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            If the second render does not contain the element that was present
            in the first render, you should remove the existing node from the
            container. For that, you can use DOM API method{' '}
            <CodeBlock>parentNode.removeChild(node)</CodeBlock>
          </Text>,
        ],
      },
      {
        title: 'One element -> Another element',
        codeSamples: [
          '<hr />',
          '<img src="https://static.wixstatic.com/media/9ab0d1_2ff5ca18550e405ea1844e52afaff120~mv2.jpg/v1/fill/w_296,h_137,al_c,lg_1,q_80,enc_auto/Wix%20logo%20white%20BG.jpg" />',
        ],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            If the second render contains a totally different element type, you
            should create a new node of that type and replace the existing one
            in the container. For that, you can use DOM API method{' '}
            <CodeBlock>parentNode.replaceChild(newNode, oldNode)</CodeBlock>
          </Text>,
        ],
      },
      {
        title: 'Attribute is not set in the second render',
        codeSamples: ['<a href="https://wix.com">link</a>'],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            The code that handles attributes should be adjusted to receive both
            props from previous render and the current one. You should compare
            the props and update the existing node accordingly. If a prop is the
            same between renders, attribute should not be set twice.
          </Text>,
        ],
      },
      {
        title: 'Attribute is updated in the second render',
        codeSamples: [
          '<a href="https://google.com">link</a>',
          '<a href="https://wix.com">link</a>',
        ],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            If prop value changes between renders, the implementation should
            update the attribute value. You should use the same API as before -{' '}
            <CodeBlock>node.setAttribute</CodeBlock>
          </Text>,
        ],
      },
      {
        title: 'Attribute is removed in the second render',
        codeSamples: [
          '<a href="https://wix.com" title="Wix">link</a>',
          '<a href="https://wix.com">link</a>',
        ],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            If prop is no longer present in second render, the attribute should
            be removed from the node. For that, you can use DOM API method{' '}
            <CodeBlock>node.removeAttribute(name)</CodeBlock>
          </Text>,
        ],
      },
      {
        title: 'Element with nested children',
        codeSamples: ['<div>Render #1</div>', '<div>Render #2</div>'],
        description: <Text>TODO</Text>,
        hints: [
          <Text>
            If you haven't separated the logic for creating a new node and
            comparing elements between different renders, you may encounter the
            issue where <CodeBlock>miniRender</CodeBlock> function rewrites the{' '}
            <CodeBlock>rootInstance</CodeBlock> value on a single render while
            handling children recursively. To address that, you should keep the
            instance diffing in <CodeBlock>miniRender</CodeBlock> and move all
            node creation related logic to another function. You can choose any
            name for it, but in React it is called{' '}
            <CodeBlock>instantiate</CodeBlock> - that is, to create an instance
            of a DOM node from a virtual one. This might explain the naming
            behind <CodeBlock>rootInstance</CodeBlock> variable as well.
          </Text>,
          <Text>
            In this example, the root element type does not change between
            re-renders, however, it's children do change. To address that, we
            need to create another function, let's call it{' '}
            <CodeBlock>reconcileChildren</CodeBlock> which should go over all
            the children on reconcile each of them individually. Reconciliation
            will produce an instance of a child, which then should be added to
            childInstances array.
          </Text>,
        ],
      },
    ],
  }, */
]

export const findExample = (code: string): Task | undefined => {
  for (const section of data) {
    for (const example of section.tasks) {
      for (const sample of example.codeSamples) {
        if (sample === code) {
          return example
        }
      }
      // if (example.codeSamples.includes(code)) {
      //   return example
      // }
    }
  }
}
// data.find((section) =>
//   section.examples.find((example) =>
//     example.codeSamples.find((sample) => sample === code),
//   ),
// )

/*

(() => {
 const MyComp = ({ content }) => {
  return <div><Heading content={content} /></div>
}
const Heading = ({ content }) => {
  return <h2>{content}</h2>
}
const CompWithChildren = ({ children }) =>
  <div>::Parent Comp::{children}</div>
 return <CompWithChildren><Heading content="sup" /></CompWithChildren>
  return <MyComp content={"hello worldz"} />
})()

*/
