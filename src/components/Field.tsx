import React from 'react';
import styled from 'styled-components';

interface FieldProps {
  name?: string;
  value?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  max-width: 35000px;
  padding: 20px;
`;
const FieldName = styled.label``;
const FieldValue = styled.label`
  padding-left: 20px;
  font-weight: bold;
`;

export const Field: React.FC<FieldProps> = ({ name, value }) => {
  return (
    <Container>
      {name != null && <FieldName>{name}</FieldName>}
      {value != null && <FieldValue>{value}</FieldValue>}
    </Container>
  );
};
