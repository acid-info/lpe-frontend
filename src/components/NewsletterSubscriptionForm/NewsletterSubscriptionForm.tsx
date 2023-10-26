import {
  Button,
  CheckIcon,
  ErrorIcon,
  TextField,
  Typography,
} from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'

type NewsletterSubscriptionFormProps = React.HTMLAttributes<HTMLDivElement> & {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  errorMessage: string
  successMessage: string
  onClose: () => void
}

export default function NewsletterSubscriptionForm({
  handleFormSubmit,
  isSubmitting,
  errorMessage,
  successMessage,
  onClose,
}: NewsletterSubscriptionFormProps) {
  const disabled = isSubmitting

  return (
    <>
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
          <Link href="/" onClick={onClose}>
            <ToHomePageButton variant="filled">To home page</ToHomePageButton>
          </Link>
        </>
      )}

      <EmailSubscribeForm
        onSubmit={handleFormSubmit}
        hideForm={!!successMessage}
      >
        <StyledTextField
          id="firstName"
          inputProps={{ name: 'firstName', disabled }}
          placeholder="First Name"
          disabled={disabled}
        />

        <StyledTextField
          id="lastName"
          inputProps={{ name: 'lastName', disabled }}
          placeholder="Last Name"
          disabled={disabled}
        />

        <StyledTextField
          id="email"
          inputProps={{
            name: 'email',
            type: 'email',
            required: true,
            disabled,
          }}
          placeholder="Email address (required)"
          disabled={disabled}
        />

        <SubscribeButton
          variant="filled"
          type="submit"
          size="medium"
          disabled={disabled}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </SubscribeButton>
      </EmailSubscribeForm>
    </>
  )
}

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

const StyledTextField = styled(TextField)`
  width: 100%;
`

const SubscribeButton = styled(Button)`
  margin-top: 30px;
  height: 40px;
  width: 162px;
`
