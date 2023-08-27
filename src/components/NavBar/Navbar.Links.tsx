import Link from 'next/link'
import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'
import { useRouter } from 'next/router'

interface Props {
  links: { href: string; label: string }[]
}

export const NavbarLinks = ({ links }: Props) => {
  const router = useRouter()
  const { pathname } = router
  return (
    <Container>
      {links.map((link, idx) => (
        <>
          <Typography variant={'label2'}>
            <Link
              href={link.href}
              key={`navbar-link-${idx}`}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          </Typography>
          {idx !== links.length - 1 && <span className={'divider'} />}
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
  }

  a:hover, a:active, a:focus, a.active {
    text-decoration: underline;
  }

  .divider {
    display: block;
    width: 2px;
    height: 2px;
    background: rgb(var(--lsd-surface-secondary));
    border-radius: 50%;
    margin: 0 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm.width}px) {
    flex -direction: column;
    align-items: flex-start;
    .divider {
      display: none;
    }
  }
`
