import React from 'react';
import styled from 'styled-components';

interface MissionHeaderProps {
  name?: string;
  value: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  padding: 20px;
`;
const FieldValue = styled.label`
  font-weight: bold;
  font-size: 32px;
`;

export const MissionHeader: React.FC<MissionHeaderProps> = ({ value }) => {
  return (
    <Container>
      <FieldValue>{value}</FieldValue>
    </Container>
  );
};
