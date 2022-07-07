import { Launch } from './FlightListTypes';
import styled from 'styled-components';

type Props = {
  launches: Launch[];
  setFilter: any;
  filter: any;
  refetch: any;
  setPage: any;
};

const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const useMissionFilter = (filter: string, _updateFilter: React.Dispatch<React.SetStateAction<string>>) => {
  const updateFilter = (filterType: any, value: any) => {
    _updateFilter(value);
  };

  return {
    models: { filter },
    operations: { updateFilter }
  };
};

export const FlightListFilters = ({ filter, setFilter, refetch, setPage }: Props) => {
  const { operations, models } = useMissionFilter(filter, setFilter);

  return (
    <StyledSearch>
      <label>Search</label>
      <input onChange={(e) => operations.updateFilter('mission_name', e.target.value)} type="string" />
      <button
        onClick={() => {
          refetch({ mission_name: models.filter });
        }}
      >
        Submit!
      </button>
    </StyledSearch>
  );
};
