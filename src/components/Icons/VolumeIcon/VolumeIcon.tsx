import { LsdIcon } from '@acid-info/lsd-react'

export const VolumeIcon = LsdIcon(
  (props) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3.84667V7.84667H2.66667L6 11.18V0.513333L2.66667 3.84667H0ZM9 5.84667C9 4.66667 8.32 3.65333 7.33333 3.16V8.52667C8.32 8.04 9 7.02667 9 5.84667ZM7.33333 0V1.37333C9.26 1.94667 10.6667 3.73333 10.6667 5.84667C10.6667 7.96 9.26 9.74667 7.33333 10.32V11.6933C10.0067 11.0867 12 8.7 12 5.84667C12 2.99333 10.0067 0.606667 7.33333 0V0Z"
        fill={props.fill}
      />
    </svg>
  ),
  { filled: true },
)
