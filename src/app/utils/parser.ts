import { miniCreateElement } from '../../mini-react'
import React from 'react'
;(window as any).miniCreateElement = miniCreateElement
;(window as any).React = React

import { transform } from '@babel/standalone'

export const parse = (input: string, useReact: boolean) => {
  let code: string
  try {
    const result = transform(input, {
      presets: ['react'],
      plugins: [
        [
          'transform-react-jsx',
          useReact
            ? {}
            : {
                pragma: 'miniCreateElement',
              },
        ],
      ],
    })

    code = result.code as string
  } catch (err: any) {
    console.error(`Failed to parse input: ${err.toString()}`)
    throw err
  }
  return eval(code)
}
