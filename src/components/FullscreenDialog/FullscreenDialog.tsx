import { CloseIcon, IconButton } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useEffect } from 'react'

type FullscreenDialogProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function FullscreenDialog({
  isOpen,
  onClose,
  children,
  ...props
}: FullscreenDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <FullscreenDialogContainer {...props}>
      <MainContentContainer>
        <IconButton
          className="fullscreen-dialog__close-button"
          size="small"
          onClick={() => onClose()}
        >
          <CloseIcon color="primary" />
        </IconButton>
        {children}
      </MainContentContainer>
    </FullscreenDialogContainer>
  )
}

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* safe center will center for large screens, but still show a scroll bar for smaller screens */
  justify-content: safe center;

  overflow: auto;
  height: 100%;

  padding: 24px 0;
  width: 430px;
  max-width: 90%;

  .fullscreen-dialog__close-button {
    position: absolute;
    top: 8px;
    right: 30px;
  }
`

const FullscreenDialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgb(var(--lsd-surface-primary));

  display: flex;
  align-items: center;
  justify-content: center;
`
