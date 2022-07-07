import { Launch } from './FlightListTypes';
import { useNavigate } from 'react-router-dom';

type Props = {
  launch: Launch;
};

export default function LaunchRow({ launch }: Props) {
  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate(`/details/${id}`, {
      state: {
        id: launch.id,
        missionName: launch.mission_name,
        date: launch.launch_date_local,
        launchSite: launch.launch_site.site_name_long,
        rocketName: launch.rocket.rocket_name,
        status: launch.launch_success,
        payloads: launch.rocket.second_stage.payloads,
        videoLink: launch.links.video_link,
        imagesLinks: launch.links.flickr_images
      }
    });
  };

  return (
    <tr key={launch.id} onClick={() => navigateToDetails(launch.id)}>
      <td>
        <strong>{launch.id}</strong>
      </td>
      <td>{launch.launch_date_local}</td>
      <td>{launch.launch_site.site_name_long}</td>
      <td>{launch.mission_name}</td>
      <td>{launch.rocket.rocket_name}</td>
      <td>{launch.ships[0]?.name}</td>
      <td>{launch.ships[0]?.home_port}</td>
      <td>
        <img src={launch.ships[0]?.image} alt={launch.ships[0]?.name} width="100px" />
      </td>
    </tr>
  );
}
