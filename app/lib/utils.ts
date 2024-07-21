import {
  Mission,
  FilterParams,
  FilterMissionsFunction,
} from "../types/missionTypes";

export const prepareData = (
  filterParams: FilterParams,
): FilterMissionsFunction => {
  return (missions: Mission[]) => {
    // Filter out non matching missions
    const filteredMissions = missions.filter((mission) => {
      return (
        Number(mission.launch_year) == filterParams.year &&
        mission.rocket.second_stage.payloads.some((payload) => {
          return payload.customers.some((customer) => {
            // Substring check for cases such as "NASA" in "NASA (CRS)""
            return customer.indexOf(filterParams.customerName) >= 0;
          });
        })
      );
    });

    const sortedMissions = filteredMissions.sort((a, b) => {
      const payloadCountA = a.rocket.second_stage.payloads.length;
      const payloadCountB = b.rocket.second_stage.payloads.length;

      // Sort by biggest payload count first
      if (payloadCountA !== payloadCountB) {
        return payloadCountB - payloadCountA;
      }
      // Then sort by inverse chronological order
      const dateA = new Date(a.launch_date_utc).getTime();
      const dateB = new Date(b.launch_date_utc).getTime();
      return dateB - dateA;
    });

    return sortedMissions.map((mission) => {
      return {
        flight_number: mission.flight_number,
        mission_name: mission.mission_name,
        payloads_count: mission.rocket.second_stage.payloads.length,
      };
    });
  };
};
