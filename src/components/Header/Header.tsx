import { Typography } from "@acid-info/lsd-react";
import styled from "@emotion/styled";

export default function Header() {
  return (
    <Container>
      <Typography genericFontFamily="serif" component="span" variant="h2">
        LOGOS →{" "}
        <Title genericFontFamily="serif" component="span" variant="h2">
          PRESS ENGINE
        </Title>
      </Typography>
      <Description component="div" variant="label2">
        Blog with media written by Logos members
      </Description>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px 16px 8px 16px;
`;

const Title = styled(Typography)`
  white-space: nowrap;
`;

const Description = styled(Typography)`
  margin-top: 6px;
`;
