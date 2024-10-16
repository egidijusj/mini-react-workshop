import React from 'react'
import ReactDOM from 'react-dom/client'
import { WixDesignSystemProvider } from '@wix/design-system'
import '@wix/design-system/styles.global.css'
import { App } from './app/App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <App />
    </WixDesignSystemProvider>
  </React.StrictMode>,
)
