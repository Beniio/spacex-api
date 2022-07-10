import { useLocation } from 'react-router';
import { Payload } from './FlightListTypes';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { MissionHeader } from './components/MissionHeader';

interface LaunchDetails {
  id: string;
  missionName: string;
  date: string;
  launchSite: string;
  rocketName: string;
  status: boolean;
  payloads: Payload[];
  videoLink: string;
  imagesLinks: string[];
}

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div``;

const StyledImage = styled.img`
  width: 200px;
  height: 160px;
  padding: 0 3px 3px 3px;

  // &:hover {
  //   -webkit-transform: scale(2);
  //   transform: scale(2);
  // }
`;

const StyledVideo = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 613px;
  padding-left: 42px;
`;

const StyledTableColumn = styled.tr`
  &:first-child {
    border-top: hidden;
    border-right: hidden;
    border-left: hidden;
    justify-content: center;
  }
`;

const StyledTableRow = styled.td`
  border-bottom: 1px solid grey;
  background: white;
  border-right: hidden;
  border-left: hidden;

  &:nth-child(even) {
    text-align: center;
  }
`;

export default function FlightDetails() {
  const location: any = useLocation();
  const launch: LaunchDetails = location.state;
  const data: { title: string; value: string }[] = [
    { title: 'Rocket name', value: launch.rocketName },
    { title: 'Launch site', value: launch.launchSite },
    { title: 'Date', value: launch.date },
    { title: 'Mission status', value: convertFlightStatus(launch.status) }
  ];

  const listImages = launch.imagesLinks?.map((image) => (
    <>
      <StyledImage key={image} src={image} onClick={() => {}} />
    </>
  ));

  return (
    <StyledContainer>
      <MissionHeader value={launch.missionName} />
      <Row>
        <Column>
          <p>Details:</p>
          <table className="table">
            <tbody>
              {data.map((row) => (
                <StyledTableColumn key={row.title}>
                  <StyledTableRow>{row.title}</StyledTableRow>
                  <StyledTableRow> {row.value}</StyledTableRow>
                </StyledTableColumn>
              ))}
            </tbody>
          </table>
        </Column>
        <Column>
          <ImageContainer>
            <ul>{listImages}</ul>
          </ImageContainer>
        </Column>
      </Row>
      <Column>
        <p>Payload:</p>
        {launch?.payloads && (
          <table className="table">
            <tbody>
              {launch.payloads.map((row) => (
                <StyledTableColumn key={row}>
                  <StyledTableRow>{row.payload_type}</StyledTableRow>
                  <StyledTableRow> {row.payload_mass_kg}kg</StyledTableRow>
                </StyledTableColumn>
              ))}
            </tbody>
          </table>
        )}
      </Column>
      <Column>
        <StyledVideo>
          <ReactPlayer url={launch.videoLink} />{' '}
        </StyledVideo>
      </Column>
    </StyledContainer>
  );
}

const convertFlightStatus = (status: boolean): string => {
  return status ? 'Successful' : 'Unsuccesfull';
};
