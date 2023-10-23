import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

type EmailSubscribeProps = React.HTMLAttributes<HTMLDivElement> & {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export const EmailSubscribe = ({ onSubmit, ...props }: EmailSubscribeProps) => {
  return (
    <EmailSubscribeContainer {...props}>
      <Typography
        variant="h6"
        component="label"
        htmlFor="email"
        style={{
          marginBottom: '24px',
        }}
      >
        Subscribe for updates
      </Typography>

      <EmailSubscribeForm onSubmit={onSubmit}>
        <EmailSubscribeInput
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
        />

        <Button
          variant="filled"
          type="submit"
          style={{ height: '40px', width: '162px' }}
        >
          Subscribe
        </Button>
      </EmailSubscribeForm>
    </EmailSubscribeContainer>
  )
}

const EmailSubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-block: 1px solid rgb(var(--lsd-border-primary));
  padding: 24px 0px;
  margin-top: 24px;
`

const EmailSubscribeForm = styled.form`
  display: flex;
  gap: 16px;
  width: 100%;
`

const EmailSubscribeInput = styled.input`
  padding: 0;
  padding-left: 18px;
  box-sizing: border-box;
  border: 1px solid rgb(var(--lsd-border-primary));
  height: 40px;
  width: 100%;

  &:focus {
    outline: none;
  }
`
