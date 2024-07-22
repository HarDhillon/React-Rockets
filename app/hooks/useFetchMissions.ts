import { FilterParams, FilteredMission } from "../types/missionTypes";
import { useState, useEffect, useMemo } from "react";
import { prepareData } from "../lib/utils";

export default function useFetchMissions(filterParams: FilterParams) {
  const [missions, setMissions] = useState<FilteredMission[]>([]);
  const [loading, setLoading] = useState<string | boolean>("Loading...");
  const [error, setError] = useState<string | boolean>(false);

  const filterDataFunction = useMemo(
    () => prepareData(filterParams),
    [filterParams],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.spacexdata.com/v3/launches/past`,
        );
        const data = await response.json();
        const filteredData = filterDataFunction(data);
        setMissions(filteredData);
      } catch (err) {
        setError("Could not fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filterParams, filterDataFunction]);

  return { missions, loading, error };
}
