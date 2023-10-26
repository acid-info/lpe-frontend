import { NewsletterSubscriptionDialog } from '@/containers/NewsletterSubscriptionDialog'
import { Tag, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'

export default function SubscribeButton() {
  const [showDialog, setShowDialog] = useState(false)

  const handleClick = () => {
    setShowDialog(!showDialog)
  }

  return (
    <>
      <CustomTag onClick={handleClick}>
        <Typography variant="body3" className="subscribe-button-text">
          Subscribe
        </Typography>
      </CustomTag>
      <NewsletterSubscriptionDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  )
}

const CustomTag = styled(Tag)`
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
