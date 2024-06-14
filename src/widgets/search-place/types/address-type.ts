interface AddressT {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface RoadAddressT {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}

interface DocumentT {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;
  address: AddressT;
  road_address: RoadAddressT;
}

interface MetaT {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

interface GetPlacesByAddressResponseT {
  documents: DocumentT[];
  meta: MetaT;
}

export type {
  AddressT,
  RoadAddressT,
  DocumentT,
  MetaT,
  GetPlacesByAddressResponseT,
};
