import { copyConfigs } from '@/configs/copy.configs'
import { api } from '@/services/api.service'
import { lsdUtils } from '@/utils/lsd.utils'
import {
  Button,
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  IconButton,
  Typography,
} from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LogosIcon } from '../Icons/LogosIcon'

const mockOnSubmit = (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Form data submitted:', data)
      resolve(true)
    }, 3000)
  })
}

type EmailSubscribeProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean
  onClose: () => void
}

export type SubscribeFormData = {
  email: string
  firstName: string
  lastName: string
}

export default function SubscribeDialogue({
  isOpen,
  onClose,
  ...props
}: EmailSubscribeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Reset states when the dialog is closed.
  useEffect(() => {
    if (!isOpen) {
      if (successMessage) {
        setSuccessMessage('')
      }

      if (errorMessage) {
        setErrorMessage('')
      }
    }
  }, [isOpen, successMessage, errorMessage])

  if (!isOpen) {
    return null
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const firstName = e.currentTarget.firstName.value || ''
      const lastName = e.currentTarget.lastName.value || ''
      const email = e.currentTarget.email.value

      const apiResponse = await api.subscribeToMailingList({
        email,
        firstName,
        lastName,
      })

      setSuccessMessage(apiResponse.message)
    } catch (error) {
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
          <LogosIcon color="primary" width="36px" height="36px" />
          <PressLogoType variant={'h1'} genericFontFamily={'serif'}>
            {copyConfigs.navbar.title}
          </PressLogoType>
        </LogosIconAndTitleContainer>
        <Typography variant="body2">Subscribe for updates</Typography>

        {errorMessage && (
          <MessageContainer>
            <ErrorIcon color="primary" />
            <SubmitionInfoMessage variant="body2">
              {errorMessage}
            </SubmitionInfoMessage>
          </MessageContainer>
        )}

        {successMessage && (
          <>
            <MessageContainer>
              <CheckIcon color="primary" />
              <SubmitionInfoMessage variant="body2">
                {successMessage}
              </SubmitionInfoMessage>
            </MessageContainer>
            <Link href="/">
              <ToHomePageButton variant="filled">To home page</ToHomePageButton>
            </Link>
          </>
        )}

        <EmailSubscribeForm
          onSubmit={handleFormSubmit}
          hideForm={!!successMessage}
        >
          <StyledInput
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            disabled={isSubmitting}
          />

          <StyledInput
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            disabled={isSubmitting}
          />

          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="Email address (required)"
            disabled={isSubmitting}
            required
          />

          <SubscribeButton
            variant="filled"
            type="submit"
            size="medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </SubscribeButton>
        </EmailSubscribeForm>
      </MainContentContainer>
    </SubscribeDialogueContainer>
  )
}

const PressLogoType = styled(Typography)`
  text-transform: uppercase;
  font-size: 30px;
  line-height: 36px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    font-size: 20px;
    line-height: 26px;
  }
`

const ToHomePageButton = styled(Button)`
  margin-top: 46px;
  height: 40px;
  width: 162px;
  color: rgb(var(--lsd-text-secondary));
`

const MessageContainer = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid rgb(var(--lsd-border-primary));
  padding: 14px;

  margin-bottom: -6px;
  margin-top: 40px;

  width: 430px;
  max-width: 93%;
`

const SubmitionInfoMessage = styled(Typography)`
  padding-left: 14px;
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
  width: 430px;
  max-width: 90%;

  .subscribe-dialogue__close-button {
    position: absolute;
    top: 8px;
    right: 30px;
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

const EmailSubscribeForm = styled.form<{
  hideForm: boolean
}>`
  display: ${({ hideForm }) => (hideForm ? 'none' : 'flex')};
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

  background-color: rgb(var(--lsd-surface-primary));
`

const SubscribeButton = styled(Button)`
  margin-top: 30px;
  height: 40px;
  width: 162px;
`
