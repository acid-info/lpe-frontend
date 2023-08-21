import Link from 'next/link'
import styled from '@emotion/styled'

interface Props {
  links: { href: string; label: string }[]
}

export const NavbarLinks = ({ links }: Props) => {
  return (
    <Container>
      {links.map((link, idx) => (
        <>
          <Link href={link.href} key={`navbar-link-${idx}`}>
            {link.label}
          </Link>
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

  .divider {
    display: block;
    width: 2px;
    height: 2px;
    background: rgb(var(--lsd-surface-secondary));
    border-radius: 50%;
    margin: 0 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm.width}px) {
    flex-direction: column;
    align-items: flex-start;
    .divider {
      display: none;
    }
  }
`
