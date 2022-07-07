import { useLocation } from 'react-router';
import { Payload } from './FlightListTypes';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Field } from './components/Field';
import { Header } from './components/Header';

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
  margin: 0 40px 0 40px;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 700px;
  margin-right: 50px;
`;

const StyledBulletList = styled.li``;

const StyledImage = styled.img`
  width: 100px;
  height: 80px;
  padding: 4px;
  &:hover {
    -webkit-transform: scale(10); /* or some other value */
    transform: scale(10);
  }
`;
export default function FlightDetails() {
  const location: any = useLocation();

  const launch: LaunchDetails = location.state;

  const listItems = launch.payloads?.map((item) => (
    <>
      <StyledBulletList>
        {item?.payload_type} Mass[kg]:{item?.payload_mass_kg}
      </StyledBulletList>
    </>
  ));

  const listImages = launch.imagesLinks?.map((image) => (
    <>
      <StyledImage key={image} src={image} onClick={() => {}} />
    </>
  ));

  return (
    <>
      <Header value={launch.missionName} />
      <StyledContainer>
        <StyledRow>
          <StyledColumn>
            <Field name="Date:" value={launch.date} />
            <Field name="Launch site:" value={launch.launchSite} />
            <Field name="Rocket name:" value={launch.rocketName} />
            <Field name="Launch status:" value={convertFlightStatus(launch.status)} />
            <Field name="Payload:" />
            <ul>{listItems}</ul>
          </StyledColumn>
          <StyledColumn>
            <ReactPlayer url={launch.videoLink} />
            <ImageContainer>
              <ul>{listImages}</ul>
            </ImageContainer>
          </StyledColumn>
        </StyledRow>
      </StyledContainer>
    </>
  );
}

const convertFlightStatus = (status: boolean): string => {
  return status ? 'Successful' : 'Unsuccesfull';
};
