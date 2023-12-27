import { Button, FolderIcon, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'

export type TagCardProps = React.ComponentProps<typeof Root> & {
  name: string
  count?: number
}

export const TagCard: React.FC<TagCardProps> = ({ name, count, ...props }) => {
  return (
    <Root {...props}>
      <CustomButton icon={<FolderIcon color="primary" />}>
        <Info>
          <Typography component="p" variant="label1">
            {name}
          </Typography>
          {count && (
            <Typography component="span" variant="subtitle3">
              {count} posts
            </Typography>
          )}
        </Info>
      </CustomButton>
    </Root>
  )
}

const Root = styled(Link)`
  text-decoration: none;
`

const CustomButton = styled(Button)`
  width: 100%;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  padding: var(--lsd-spacing-16) !important;

  .lsd-button {
    overflow: hidden;
  }

  .lsd-button__text {
    flex: 1 1 auto;
  }

  &:hover {
    .lsd-button__text {
      text-decoration: none !important;
    }
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > p {
    text-align: left;
    text-decoration: underline;
    height: var(--lsd-label1-lineHeight);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > span {
    flex: 0 0 auto;
  }
`
