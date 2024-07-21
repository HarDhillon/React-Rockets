export interface FilterParams {
  year: number;
  customerName: string;
}

//* I initially wrote the rocket interface as commented below but made the decision to write it inline
//* I found it easier to see how customers was nested

// export interface Payload {
//   customers: string[];
// }

// export interface SecondStage {
//   payloads: Payload[];
// }

// export interface Rocket {
//   second_stage: SecondStage;
// }

export interface Mission {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  rocket: {
    second_stage: {
      payloads: {
        customers: string[];
      }[];
    };
  };
}

export interface FilteredMission {
  flight_number: number;
  mission_name: string;
  payloads_count: number;
}

export type FilterMissionsFunction = (missions: Mission[]) => FilteredMission[];
