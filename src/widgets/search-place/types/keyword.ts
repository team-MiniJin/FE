interface SameNameT {
  region: string[];
  keyword: string;
  selected_region: string;
}

interface MetaT {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: SameNameT;
}

interface DocumentT {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

interface GetPlacesByKeywordResponseT {
  meta: MetaT;
  documents: DocumentT[];
}

export type { SameNameT, MetaT, DocumentT, GetPlacesByKeywordResponseT };
