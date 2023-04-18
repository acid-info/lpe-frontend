import { Tag } from "@acid-info/lsd-react";
import styled from "@emotion/styled";

export default function Header() {
  return (
    <Container>
      <Tags>
        <Tag size="small" disabled={false}>
          Privacy
        </Tag>
        <Tag size="small" disabled={false}>
          Security
        </Tag>
        <Tag size="small" disabled={false}>
          Liberty
        </Tag>
        <Tag size="small" disabled={false}>
          Censorship
        </Tag>
        <Tag size="small" disabled={false}>
          Decentralization
        </Tag>
        <Tag size="small" disabled={false} style={{ whiteSpace: "nowrap" }}>
          Openness / inclusivity
        </Tag>
        <Tag size="small" disabled={false}>
          Innovation
        </Tag>
        <Tag size="small" disabled={false}>
          Interview
        </Tag>
        <Tag size="small" disabled={false}>
          Podcast
        </Tag>
        <Tag size="small" disabled={false}>
          Law
        </Tag>
      </Tags>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px 0 16px 16px;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-right: 16px;
`;
