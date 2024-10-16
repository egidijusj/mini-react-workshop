import React from 'react'
import { Box, Heading, Divider } from '@wix/design-system'

import {
  miniRender,
  unmount,
  useState,
  useEffect as useMiniReactEffect,
} from '../mini-react'
import { useCallback, useEffect } from 'react'
import { Root, createRoot } from 'react-dom/client'
import { parse } from './utils/parser'
import { Sidebar } from './components/Sidebar'
import { usePersistentState } from './utils/usePersistentState'
import { useObserver } from './utils/useObserver'
import { CodeEditor } from './components/CodeEditor'
import { ErrorModal, RuntimeError } from './components/ErrorModal'
import { InputHeader } from './components/InputHeader'
import { RenderSettings } from './components/RenderSettings'
import { OutputHeader } from './components/OutputHeader'
import { OutputContainer } from './components/OutputContainer'

Object.assign(window, { useState, useEffect: useMiniReactEffect })

export const App = () => {
  const [src, setSrc] = usePersistentState<string>('src', '')
  const [useReact, setUseReact] = usePersistentState<boolean>('useReact', false)
  const [clearOutput, setClearOutput] = usePersistentState<boolean>(
    'clearOutput',
    true,
  )
  const reactRoot = React.useRef<Root | null>(null)
  const [runtimeError, setRuntimeError] = React.useState<RuntimeError | null>(
    null,
  )
  const [customOutputMatchesReact, setCustomOutputMatchesReact] =
    React.useState<boolean | null>(null)

  const [reactStats, resetReactStats] = useObserver('react-output')
  const [miniReactStats, resetMiniReactStats] = useObserver('custom-output')

  const resetStats = useCallback(() => {
    resetReactStats()
    resetMiniReactStats()
  }, [])

  useEffect(() => {
    setCustomOutputMatchesReact(null)
  }, [src, useReact, clearOutput])

  const cleanUp = useCallback(() => {
    reactRoot.current!.unmount()
    const reactOutput = document.getElementById('react-output')!
    reactRoot.current = createRoot(reactOutput)

    unmount(document.getElementById('custom-output')!)
  }, [])

  const doRender = useCallback(() => {
    resetStats()
    let reactElement: any
    let miniReactElement: any
    try {
      reactElement = parse(src, true)
      if (!useReact) {
        miniReactElement = parse(src, false)
      }
    } catch (err: any) {
      console.error(err)
      setRuntimeError({ type: 'Parsing Error', error: err.toString() })
      return
    }

    reactRoot.current!.render(reactElement)

    if (!useReact) {
      const output = document.getElementById('custom-output')!

      try {
        miniRender(miniReactElement, output)
      } catch (err: any) {
        console.error(err)
        setRuntimeError({ type: 'Render Error', error: err.toString() })
        return
      }

      setTimeout(() => {
        setCustomOutputMatchesReact(
          document.getElementById('custom-output')!.innerHTML ===
            document.getElementById('react-output')!.innerHTML,
        )
      }, 5)
    }
  }, [src, useReact, resetStats])

  useEffect(() => {
    if (reactRoot.current) {
      return
    }
    const reactOutput = document.getElementById('react-output')!
    const root = createRoot(reactOutput)
    reactRoot.current = root
  }, [])

  const run = useCallback(() => {
    if (clearOutput) {
      cleanUp()
      setTimeout(() => {
        doRender()
      }, 20)
    } else {
      doRender()
    }
  }, [cleanUp, doRender, clearOutput])

  return (
    <>
      <div className="header">
        <Heading size="extraLarge">MiniReact™</Heading>
      </div>
      <Divider />
      <div className="main-layout">
        <div className="content">
          <Box direction="vertical">
            <Sidebar
              setCode={(code: string) => {
                setSrc(code)
                resetStats()
              }}
            />
          </Box>
        </div>
        <div className="input-wrapper">
          <Box
            direction="vertical"
            paddingTop="20px"
            height="calc(100% - 73px)"
          >
            <InputHeader
              renderer={useReact ? 'react' : 'mini-react'}
              onRunClick={run}
              onRendererChange={(renderer) => setUseReact(renderer === 'react')}
            />
            <Box height={'20px'} />
            <CodeEditor
              value={src}
              onChange={(value) => {
                setSrc(value)
                resetStats()
              }}
            />
            {/* <Box height={'20px'} />
            <RenderSettings
              clearOutput={clearOutput}
              onClearOutputChange={setClearOutput}
            /> */}
          </Box>
        </div>
        <div className="output-wrapper">
          <Box paddingTop="20px" paddingRight="20px" direction="vertical">
            <OutputHeader
              miniReactRendersLikeReact={customOutputMatchesReact}
            />
            <Box height={'26px'} />
            <OutputContainer
              renderer={useReact ? 'react' : 'mini-react'}
              reactStats={reactStats}
              miniReactStats={miniReactStats}
            />
          </Box>
        </div>
      </div>
      <ErrorModal error={runtimeError} clear={() => setRuntimeError(null)} />
    </>
  )
}
