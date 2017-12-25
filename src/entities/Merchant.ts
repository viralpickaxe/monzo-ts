export interface Merchant {
  id: string;
  group_id: string;
  created: Date;
  name: string;
  logo: string;
  emoji: string;
  category: string;
  online: boolean;
  atm: boolean;
  address: {
    short_formatted: string;
    formatted: string;
    address: string;
    city: string;
    region: string;
    country: string;
    postcode: string;
    latitude: number;
    longitude: number;
    zoom_level: number;
    approximate: boolean;
  };
  updated: Date;
  metadata: Object;
  disable_feedback: boolean;
}
