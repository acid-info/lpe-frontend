import NextNProgress from 'nextjs-progressbar'

export const ProgressBar = () => {
  return (
    <NextNProgress
      color="rgb(var(--lsd-surface-secondary))"
      height={1}
      options={{
        showSpinner: false,
      }}
    />
  )
}
