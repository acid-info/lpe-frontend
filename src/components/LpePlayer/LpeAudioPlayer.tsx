import {
  LpeAudioPlayerControls,
  LpeAudioPlayerControlsProps,
} from '@/components/LpePlayer/Controls/Controls'
import styled from '@emotion/styled'

interface LpeAudioPlayerProps {
  controlProps: LpeAudioPlayerControlsProps
}
export const LpeAudioPlayer = (props: LpeAudioPlayerProps) => {
  const { controlProps } = props

  return (
    <AudioPlayer>
      <LpeAudioPlayerControls {...controlProps} />
    </AudioPlayer>
  )
}

const AudioPlayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
