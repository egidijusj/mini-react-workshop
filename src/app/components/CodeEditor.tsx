import React from 'react'
import { Editor } from '@monaco-editor/react'

export const CodeEditor = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <div
      style={{
        border: '1px solid rgb(17, 109, 255)',
        borderRadius: '10px',
        padding: '3px',
        minHeight: '244px',
        maxHeight: 'calc(100vh - 200px)',
        flexGrow: 2,
      }}
    >
      <Editor
        height="100%"
        width="100%"
        language="javascript"
        theme="light"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          lineNumbers: 'off',
          autoIndent: 'full',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          renderLineHighlight: 'none',
        }}
        onChange={(value) => onChange(value || '')}
        value={value}
      />
    </div>
  )
}
