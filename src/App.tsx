import React from 'react';
import { Route, Routes } from 'react-router';
import ApiProvider from './ApiProvider';
import FlightDetails from './FlightDetails';
import FlightListPageGraphQL from './FlightListPageGraphQL';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  height: 50px;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 2px 2px rgba(9, 9, 9, 0.23);
  padding: 10px;
`;

export const App = () => {
  return (
    <ApiProvider>
      <StyledLink to={'/'}>SpaceX App</StyledLink>
      <Routes>
        <Route path="/details/:id" element={<FlightDetails />} />
        <Route path="/" element={<FlightListPageGraphQL />} />
      </Routes>
    </ApiProvider>
  );
};
