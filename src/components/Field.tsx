import React from 'react';
import styled from 'styled-components';

interface FieldProps {
  name?: string;
  value?: string;
}

const Container = styled.div`
  display: block;
  margin: 10px;
  max-width: 350px;
  padding: 4px 0;
`;
const FieldName = styled.label`
  font-weight: bold;
  white-space: pre-line;
`;
const FieldValue = styled.span`
  padding-left: 20px;
`;

export const Field: React.FC<FieldProps> = ({ name, value }) => {
  return (
    <Container>
      {name != null && <FieldName>{name}</FieldName>}
      {value != null && <FieldValue>{value}</FieldValue>}
    </Container>
  );
};
