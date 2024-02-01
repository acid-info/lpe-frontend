import { NewsletterSubscriptionDialog } from '@/containers/NewsletterSubscriptionDialog'
import { AddIcon, Button } from '@acid-info/lsd-react'
import { useState } from 'react'

export default function SubscribeButton() {
  const [showDialog, setShowDialog] = useState(false)

  const handleClick = () => {
    setShowDialog(!showDialog)
  }

  return (
    <>
      <Button
        size="small"
        onClick={handleClick}
        icon={<AddIcon color="primary" />}
      >
        Subscribe
      </Button>
      <NewsletterSubscriptionDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  )
}
