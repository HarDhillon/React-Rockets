import { FilterParams, FilteredMission } from "../types/missionTypes";
import { useState, useEffect } from "react";
import { prepareData } from "../lib/utils";

export default function useFetchMissions(filterParams: FilterParams) {
  const [missions, setMissions] = useState<FilteredMission[]>([]);
  const [loading, setLoading] = useState<string | boolean>("Loading...");
  const [error, setError] = useState<string | boolean>(false);

  const filterDataFunction = prepareData(filterParams);

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

    // TODO useMemo to memoise our filterDataFunction before including it in the array
    fetchData();
  }, [filterParams]);

  return { missions, loading, error };
}
