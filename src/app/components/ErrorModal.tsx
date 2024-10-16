import { MessageModalLayout } from '@wix/design-system'

export interface RuntimeError {
  type: 'Parsing Error' | 'Render Error'
  error: string
}

export const ErrorModal = ({
  error,
  clear,
}: {
  error: RuntimeError | null
  clear: () => void
}) => {
  if (!error) {
    return null
  }
  return (
    <div className="modal-container">
      <MessageModalLayout
        theme={'destructive'}
        onCloseButtonClick={() => clear()}
        primaryButtonOnClick={() => clear()}
        primaryButtonText="Close"
        title={error.type}
        content={<pre>{error.error}</pre>}
      />
    </div>
  )
}
