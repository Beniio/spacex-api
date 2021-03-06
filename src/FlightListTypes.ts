export type Ship = {
  name: string;
  home_port: string;
  image: string;
};
export type Payload = {
  payload_type: string;
  payload_mass_kg: number;
};

export type Launch = {
  id: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    video_link: string;
    flickr_images: string[];
  };
  mission_name: string;
  rocket: {
    rocket_name: string;
    second_stage: {
      payloads: Payload[];
    };
  };
  launch_success: boolean;
  ships: Ship[];
};
