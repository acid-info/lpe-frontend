import { CollapseProps, Collapse as LsdCollapse } from '@acid-info/lsd-react'
import styles from './Collapse.module.css'
import styled from '@emotion/styled'
import clsx from 'clsx'

export default function Collapse({
  label,
  children,
  className,
  ...props
}: CollapseProps) {
  return (
    <LsdCollapse
      label={label}
      {...props}
      className={clsx(styles.collapse, className)}
    >
      {children}
    </LsdCollapse>
  )
}
