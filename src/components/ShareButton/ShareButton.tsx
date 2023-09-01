import { Tag, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { CopyIcon } from '../Icons/CopyIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { XIcon } from '../Icons/XIcon'

type Props = {
  url: string
}

export default function ShareButton({ url }: Props) {
  const [showOptions, setShowOptions] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  useClickAway(ref, () => {
    setShowOptions(false)
  })

  const handleClick = () => {
    if (navigator.share) {
      const shareObject = {
        url: url,
      }
      navigator.share(shareObject).catch((error) => {
        console.error('Error sharing', error)
        setShowOptions(!showOptions)
      })
    } else {
      setShowOptions(!showOptions)
    }
  }

  const handleCopyClipBoard = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Container ref={ref}>
      <CustomTag
        onClick={handleClick}
        icon={<ShareIcon color="primary" width={14} height={14} />}
        iconDirection="left"
        showOptions={showOptions}
      >
        <Typography variant="body3">Share</Typography>
      </CustomTag>
      {showOptions && (
        <Options>
          <Label>
            <Typography variant="body3">Share Options</Typography>
          </Label>
          <ShareOption onClick={() => handleCopyClipBoard(url)}>
            <CopyIcon color="primary" width={14} height={14} />
            <Typography variant="body2">
              {copied ? 'Copied' : 'Copy link'}
            </Typography>
          </ShareOption>
          <CustomLink href={`http://www.twitter.com/share?url=${url}`}>
            <ShareOption>
              <XIcon />
              <Typography variant="body2">X</Typography>
            </ShareOption>
          </CustomLink>
        </Options>
      )}
    </Container>
  )
}

const HEIGHT = 24

const Container = styled.div`
  position: relative;
`

const CustomTag = styled(Tag)<{ showOptions: boolean }>`
  width: 69px;
  height: ${HEIGHT}px;
  padding: 0 8px;
  border-bottom: ${(props) =>
    props.showOptions
      ? '1px solid transparent'
      : '1px solid rgb(var(--lsd-border-primary))'};
`

const Options = styled.div`
  top: ${HEIGHT - 1}px;
  left: 0;
  width: 169px;
  border: 1px solid rgb(var(--lsd-border-primary));
  position: absolute;
  background-color: rgb(var(--lsd-surface-primary));
  padding-bottom: 8px;
  z-index: 1;
`

const Label = styled.div`
  padding: 12px;
`

const ShareOption = styled.div`
  cursor: pointer;
  padding: 6px 12px 6px 14px;
  display: flex;
  gap: 14px;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`

const CustomLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 14px;

  &:hover {
    text-decoration: underline;
  }
`
