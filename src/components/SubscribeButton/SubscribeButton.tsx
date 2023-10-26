import { Tag, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { SubscribeDialogue } from '../SubscribeDialogue'

export default function SubscribeButton() {
  const [showDialogue, setShowDialogue] = useState(false)

  const handleClick = () => {
    setShowDialogue(!showDialogue)
  }

  return (
    <>
      <CustomTag onClick={handleClick} iconDirection="left">
        <Typography variant="body3" className="subscribe-button-text">
          Subscribe
        </Typography>
      </CustomTag>
      <SubscribeDialogue
        isOpen={showDialogue}
        onClose={() => setShowDialogue(false)}
      />
    </>
  )
}

const CustomTag = styled(Tag)`
  gap: 0 8px;
  padding: 4px 12px;
  background-color: rgb(var(--lsd-surface-secondary));

  .subscribe-button-text {
    color: rgb(var(--lsd-text-secondary));
  }

  &:hover {
    .subscribe-button-text {
      text-decoration: underline;
    }
  }
`
