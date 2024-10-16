import React from 'react'
import ReactDOM from 'react-dom/client'

import { MiniReactPlayground } from 'mini-react-playground'
import 'mini-react-playground/dist/index.css'

import * as miniReact from './mini-react/miniReact'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MiniReactPlayground miniReact={miniReact} />
  </React.StrictMode>,
)
