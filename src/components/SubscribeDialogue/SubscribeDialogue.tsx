import { copyConfigs } from '@/configs/copy.configs'
import { Button, CloseIcon, IconButton, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { LogosIcon } from '../Icons/LogosIcon'
import { PressLogoType } from '../NavBar/NavBar'

type EmailSubscribeProps = React.HTMLAttributes<HTMLDivElement> & {
  onSubmit: (formData: SubscribeFormData) => void
  isOpen: boolean
  onClose: () => void
}

type SubscribeFormData = {
  email: string
  firstName: string
  lastName: string
}

export default function SubscribeDialogue({
  onSubmit,
  isOpen,
  onClose,
  ...props
}: EmailSubscribeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Reset states when the dialog is closed.
  useEffect(() => {
    if (!isOpen) {
      if (isSuccess) {
        setIsSuccess(false)
      }

      if (errorMessage) {
        setErrorMessage('')
      }
    }
  }, [isOpen, isSuccess, errorMessage])

  if (!isOpen) {
    return null
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        email: e.currentTarget.email.value,
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
      })

      setErrorMessage('')
      setIsSuccess(true)
    } catch (error) {
      setIsSuccess(false)
      setErrorMessage(
        'There was an error submitting the form. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SubscribeDialogueContainer {...props}>
      <MainContentContainer>
        <IconButton
          className="subscribe-dialogue__close-button"
          size="small"
          onClick={() => onClose()}
        >
          <CloseIcon color="primary" />
        </IconButton>

        <LogosIconAndTitleContainer>
          <LogosIcon color="primary" width="44px" height="44px" />
          <PressLogoType variant={'h2'} genericFontFamily={'serif'} display>
            {copyConfigs.navbar.title}
          </PressLogoType>
        </LogosIconAndTitleContainer>
        <Typography
          variant="body1"
          style={{
            marginBottom: '24px',
          }}
        >
          Subscribe for updates
        </Typography>
        <EmailSubscribeForm onSubmit={handleFormSubmit}>
          <StyledInput
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            disabled={isSubmitting}
            required
          />

          <StyledInput
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            disabled={isSubmitting}
            required
          />

          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            disabled={isSubmitting}
            required
          />

          <SubscribeButton
            variant="filled"
            type="submit"
            disabled={isSubmitting}
          >
            Subscribe
          </SubscribeButton>
        </EmailSubscribeForm>

        {isSubmitting && (
          <SubmitionInfoMessage variant="body1">
            Submitting...
          </SubmitionInfoMessage>
        )}
        {isSuccess && (
          <SubmitionInfoMessage variant="body1">
            Submitted successfully!
          </SubmitionInfoMessage>
        )}
        {errorMessage && (
          <SubmitionInfoMessage variant="body1">
            {errorMessage}
          </SubmitionInfoMessage>
        )}
      </MainContentContainer>
    </SubscribeDialogueContainer>
  )
}

const SubmitionInfoMessage = styled(Typography)`
  margin: 16px 0px;
`

const LogosIconAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px 0;
  width: 518px;
  max-width: 90%;

  .subscribe-dialogue__close-button {
    position: absolute;
    top: 16px;
    right: 32px;
  }
`

const SubscribeDialogueContainer = styled.div`
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

const EmailSubscribeForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 16px;
  width: 100%;
  margin-top: 50px;
`

const StyledInput = styled.input`
  padding: 0;
  padding-left: 18px;
  box-sizing: border-box;

  outline: none;
  border: none;
  border-bottom: 1px solid rgb(var(--lsd-border-primary));

  height: 40px;
  width: 100%;
  &:focus {
    outline: none;
  }
`

const SubscribeButton = styled(Button)`
  margin-top: 30px;
  height: 40px;
  width: 162px;
  flex-shrink: 0;
`
