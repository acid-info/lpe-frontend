import { uiConfigs } from '@/configs/ui.configs'
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
        <CloseButtonContainer>
          <IconButton size="small" onClick={() => onClose()}>
            <CloseIcon color="primary" />
          </IconButton>
        </CloseButtonContainer>
        {children}
      </MainContentContainer>
    </FullscreenDialogContainer>
  )
}

const CloseButtonContainer = styled.div`
  position: fixed;
  top: 8px;
  width: ${uiConfigs.maxContainerWidth}px;
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
`

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* safe center will center for large screens, but still show a scroll bar for smaller screens */
  justify-content: safe center;

  overflow: auto;
  height: 100%;

  width: ${uiConfigs.maxContainerWidth}px;
  max-width: 100%;
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
