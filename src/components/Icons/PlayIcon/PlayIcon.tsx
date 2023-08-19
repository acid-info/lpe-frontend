import { LsdIcon } from '@acid-info/lsd-react'

export const PlayIcon = LsdIcon(
  (props) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.6665 15.8346V4.16797L15.8332 10.0013L6.6665 15.8346Z"
        fill={props.fill || 'black'}
      />
    </svg>
  ),
  { filled: true },
)
