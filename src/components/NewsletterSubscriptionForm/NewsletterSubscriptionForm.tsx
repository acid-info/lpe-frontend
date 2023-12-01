import {
  Button,
  CheckIcon,
  ErrorIcon,
  TextField,
  Typography,
} from '@acid-info/lsd-react'
import styled from '@emotion/styled'

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
    <FormContainer>
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
          <GoBackButton variant="filled" onClick={onClose}>
            Go back
          </GoBackButton>
        </>
      )}

      <EmailSubscribeForm
        onSubmit={handleFormSubmit}
        hideForm={!!successMessage}
      >
        <StyledTextField
          id="firstName"
          inputProps={{ name: 'firstName', disabled }}
          placeholder="First name or pseudonym"
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
    </FormContainer>
  )
}

const FormContainer = styled.div`
  padding: 24px 0;
  width: 430px;
  max-width: 90%;
`

const GoBackButton = styled(Button)`
  margin-top: 46px;
  margin-bottom: 60px;
  height: 40px;
  width: 162px;
  color: rgb(var(--lsd-text-secondary));
`

const MessageContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  align-items: center;

  border: 1px solid rgb(var(--lsd-border-primary));
  padding: 14px;

  margin-bottom: -6px;
  margin-top: 40px;

  width: 100%;

  svg {
    flex-shrink: 0;
  }
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

  margin-bottom: 60px;
`

const StyledTextField = styled(TextField)`
  width: 100%;
`

const SubscribeButton = styled(Button)`
  margin-top: 30px;
  height: 40px;
  width: 162px;
`
