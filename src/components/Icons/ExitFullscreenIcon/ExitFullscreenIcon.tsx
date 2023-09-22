import { LsdIcon } from '@acid-info/lsd-react'

export const ExitFullscreenIcon = LsdIcon(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.fill || 'white'}
        d="M 8 19 L 8 16 L 5 16 L 5 14 L 10 14 L 10 19 Z M 14 19 L 14 14 L 19 14 L 19 16 L 16 16 L 16 19 Z M 5 10 L 5 8 L 8 8 L 8 5 L 10 5 L 10 10 Z M 14 10 L 14 5 L 16 5 L 16 8 L 19 8 L 19 10 Z M 14 10 "
      />
    </svg>
  ),
  { filled: true },
)
