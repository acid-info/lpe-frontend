import { PauseIcon } from '@/components/Icons/PauseIcon'
import { PlayIcon } from '@/components/Icons/PlayIcon'
import { convertSecToMinAndSec } from '@/utils/string.utils'
import { Typography } from '@acid-info/lsd-react'
import { MuteIcon } from '@/components/Icons/MuteIcon'
import { VolumeIcon } from '@/components/Icons/VolumeIcon'
import styles from '@/components/GlobalAudioPlayer/GlobalAudioPlayer.module.css'
import React from 'react'
import styled from '@emotion/styled'
import {
  LpeAudioPlayerControls,
  LpeAudioPlayerControlsProps,
} from '@/components/LpePlayer/Controls/Controls'

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
