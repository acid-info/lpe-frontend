import styled from "@emotion/styled";
import { LogosIcon } from "../icons/LogosIcon";
import { IconButton, Typography } from "@acid-info/lsd-react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

export default function Navbar({ isDark }: { isDark: boolean }) {
  return (
    <Container>
      <LogosIcon color="primary" />
      <Icons>
        <IconButton size="small">
          {isDark ? <SunIcon color="primary" /> : <MoonIcon color="primary" />}
        </IconButton>
        <Selector size="small">
          <Typography variant="label2">Aa</Typography>
        </Selector>
      </Icons>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(var(--lsd-theme-primary));
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const Selector = styled(IconButton)`
  border-left: none;
`;
