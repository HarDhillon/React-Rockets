"use client";
import { FilterParams, FilteredMission } from "../types/missionTypes";
import useFetchMissions from "../hooks/useFetchMissions";

interface RocketListProps {
  filterParams: FilterParams;
}

export function RocketList({ filterParams }: RocketListProps) {
  const { missions, loading, error } = useFetchMissions(filterParams);

  const renderedMissions = missions?.map((mission: FilteredMission) => {
    return (
      <li key={mission.flight_number}>
        #{mission.flight_number} {mission.mission_name} (
        {mission.payloads_count})
      </li>
    );
  });

  const renderedContent = renderedMissions?.length
    ? renderedMissions
    : "No data";

  return <ul>{loading || error || renderedContent}</ul>;
}
