import ReactPlayer from 'react-player'
import styled from '@emotion/styled'

export default function GlobalAudioPlayer() {
  const audioSrc =
    'https://pdcn.co/e/cdn.simplecast.com/audio/b623b331-ffef-40c4-918d-b35a07ee8729/episodes/72d2eac9-2d2a-4a8c-943d-c2ffa1e071c0/audio/98a3ad48-86ec-45e3-be20-bdb0beea23c1/default_tc.mp3?aid=embed'

  return (
    <Container>
      <ReactPlayer
        url={audioSrc}
        controls
        forceAudio
        width="700px"
        height="40px"
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 80px;
  background: rgb(var(--lsd-surface-primary));
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgb(var(--lsd-border-primary));
`
