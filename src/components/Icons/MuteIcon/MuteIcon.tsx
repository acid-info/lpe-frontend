import { LsdIcon } from '@acid-info/lsd-react'

export const MuteIcon = LsdIcon(
  (props) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 6C8.99986 5.44142 8.84377 4.89396 8.54931 4.41929C8.25485 3.94462 7.83372 3.56159 7.33333 3.31333V4.78667L8.96667 6.42C8.98667 6.28667 9 6.14667 9 6ZM10.6667 6C10.6667 6.62667 10.5333 7.21333 10.3067 7.76L11.3133 8.76667C11.7663 7.91496 12.0022 6.96466 12 6C12 3.14667 10.0067 0.76 7.33333 0.153333V1.52667C9.26 2.1 10.6667 3.88667 10.6667 6ZM0.846667 0L0 0.846667L3.15333 4H0V8H2.66667L6 11.3333V6.84667L8.83333 9.68C8.38667 10.0267 7.88667 10.3 7.33333 10.4667V11.84C8.23551 11.6331 9.07751 11.2201 9.79333 10.6333L11.1533 12L12 11.1533L6 5.15333L0.846667 0ZM6 0.666667L4.60667 2.06L6 3.45333V0.666667Z"
        fill={props.fill}
      />
    </svg>
  ),
  { filled: true },
)
