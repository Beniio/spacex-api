import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import FlightList from './FlightList';
import { FlightListFilters } from './FlightListFilters';
import styled from 'styled-components';

export const FLIGHT_LIST_QUERY = gql`
  query GetPastLaunches($limit: Int, $offset: Int, $mission_name: String) {
    launchesPast(
      limit: $limit
      offset: $offset
      sort: "launch_date_local"
      order: "asc"
      find: { mission_name: $mission_name }
    ) {
      id
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        video_link
        flickr_images
      }
      mission_name
      rocket {
        rocket_name
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
          }
        }
      }
      ships {
        name
        home_port
        image
      }
      launch_success
    }
  }
`;

const PAGE_SIZE = 10;

const StyledLoading = styled.div`
  display: flex;
  padding: 150px 0;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 5px;
`;

const StyledText = styled.p`
  padding: 0 10px 0 10px;
`;

const StyledPaginationNavigation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export default function FlightListPageGraphQL() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({ mission_name: undefined });

  const { loading, data, refetch } = useQuery(FLIGHT_LIST_QUERY, {
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE
    }
  });

  if (loading) {
    return <StyledLoading>Loading...</StyledLoading>;
  }

  return (
    <>
      <h2>Launch list</h2>
      <FlightListFilters
        launches={data?.launchesPast}
        filter={filter}
        setPage={setPage}
        setFilter={setFilter}
        refetch={refetch}
      />
      <FlightList launches={data?.launchesPast} />
      <StyledPaginationNavigation>
        <StyledButton disabled={!page} onClick={() => setPage((prev) => prev - 1)}>
          Prev
        </StyledButton>
        <StyledText>Page {page + 1}</StyledText>
        <StyledButton onClick={() => setPage((prev) => prev + 1)}>Next</StyledButton>
      </StyledPaginationNavigation>
    </>
  );
}
