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
  flex-flow: row wrap;
  height: 100%;
  width: 80%;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`;

const ImageContainer = styled.div`
  margin-right: 60px;
  justify-content: center;
  align-items: center;
  width: 700px;
`;

const StyledBulletList = styled.li``;

const StyledImage = styled.img`
  width: 200px;
  height: 160px;
  padding: 5px;

  &:hover {
    -webkit-transform: scale(2);
    transform: scale(2);
  }
`;

const StyledInfo = styled.div`
  display: flex;
  border: 2px solid grey;
  border-radius: 30px;
`;

const StyledVideo = styled.div``;

export default function FlightDetails() {
  const location: any = useLocation();

  const launch: LaunchDetails = location.state;

  const listItems = launch.payloads?.map((item) => (
    <>
      <StyledBulletList>
        {item?.payload_type} {item?.payload_mass_kg}[kg]
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
          <StyledInfo>
            <StyledColumn>
              <Field name="Date:" value={launch.date} />
              <Field name="Launch site:" value={launch.launchSite} />
              <Field name="Rocket name:" value={launch.rocketName} />
              <Field name="Launch status:" value={convertFlightStatus(launch.status)} />
            </StyledColumn>

            <StyledColumn>
              <Field name="Payload:" />
              <ul>{listItems}</ul>
            </StyledColumn>
          </StyledInfo>
        </StyledRow>

        <StyledRow>
          <StyledVideo>
            <ReactPlayer url={launch.videoLink} />{' '}
          </StyledVideo>
          <ImageContainer>
            <ul>{listImages}</ul>
          </ImageContainer>
        </StyledRow>
      </StyledContainer>
    </>
  );
}

const convertFlightStatus = (status: boolean): string => {
  return status ? 'Successful' : 'Unsuccesfull';
};
