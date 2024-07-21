import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { prepareData } from "../../lib/utils";
import {
  FilterParams,
  Mission,
  FilteredMission,
} from "@/app/types/missionTypes";

const sampleMissions: Mission[] = [
  {
    flight_number: 1,
    mission_name: "FalconSat",
    launch_year: "2006",
    launch_date_utc: "2006-03-24T22:30:00.000Z",
    rocket: {
      second_stage: {
        payloads: [
          {
            customers: ["DARPA"],
          },
        ],
      },
    },
  },
  {
    flight_number: 2,
    mission_name: "DemoSat",
    launch_year: "2007",
    launch_date_utc: "2007-03-21T01:10:00.000Z",
    rocket: {
      second_stage: {
        payloads: [
          {
            customers: ["NASA"],
          },
        ],
      },
    },
  },
  {
    flight_number: 3,
    mission_name: "Trailblazer",
    launch_year: "2008",
    launch_date_utc: "2008-08-02T03:34:00.000Z",
    rocket: {
      second_stage: {
        payloads: [
          {
            customers: ["NASA", "DARPA"],
          },
        ],
      },
    },
  },
];

describe("prepareData", () => {
  it("filters and sorts missions correctly", () => {
    const filterParams: FilterParams = {
      year: 2008,
      customerName: "DARPA",
    };

    const filterDataFunction = prepareData(filterParams);
    const result = filterDataFunction(sampleMissions);

    const expected: FilteredMission[] = [
      {
        flight_number: 3,
        mission_name: "Trailblazer",
        payloads_count: 1,
      },
    ];

    expect(result).toEqual(expected);
  });

  it("returns an empty array when no missions match the filter", () => {
    const filterParams: FilterParams = {
      year: 2010,
      customerName: "2001: A Space Odyssey",
    };

    const filterDataFunction = prepareData(filterParams);
    const result = filterDataFunction(sampleMissions);

    expect(result).toEqual([]);
  });
});
