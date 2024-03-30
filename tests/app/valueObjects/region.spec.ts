import { Region } from "@/app/valueObjects/region";

describe("RegionValueObject", () => {
  it.each<{
    name: string;
    input: {
      region: string;
    };
    expected: {
      region: string;
      regionGroup: string;
    };
  }>([
    {
      name: "should not throw - BR",
      input: {
        region: "BR",
      },
      expected: {
        region: "BR",
        regionGroup: "AMERICAS",
      },
    },
    {
      name: "should not throw - NA",
      input: {
        region: "NA",
      },
      expected: {
        region: "NA",
        regionGroup: "AMERICAS",
      },
    },
    {
      name: "should not throw - LAN",
      input: {
        region: "LAN",
      },
      expected: {
        region: "LAN",
        regionGroup: "AMERICAS",
      },
    },
    {
      name: "should not throw - LAS",
      input: {
        region: "LAS",
      },
      expected: {
        region: "LAS",
        regionGroup: "AMERICAS",
      },
    },
    {
      name: "should not throw - KR",
      input: {
        region: "KR",
      },
      expected: {
        region: "KR",
        regionGroup: "ASIA",
      },
    },
    {
      name: "should not throw - JP",
      input: {
        region: "JP",
      },
      expected: {
        region: "JP",
        regionGroup: "ASIA",
      },
    },
    {
      name: "should not throw - EUNE",
      input: {
        region: "EUNE",
      },
      expected: {
        region: "EUNE",
        regionGroup: "EUROPE",
      },
    },
    {
      name: "should not throw - EUW",
      input: {
        region: "EUW",
      },
      expected: {
        region: "EUW",
        regionGroup: "EUROPE",
      },
    },
    {
      name: "should not throw - TR",
      input: {
        region: "TR",
      },
      expected: {
        region: "TR",
        regionGroup: "EUROPE",
      },
    },
    {
      name: "should not throw - RU",
      input: {
        region: "RU",
      },
      expected: {
        region: "RU",
        regionGroup: "EUROPE",
      },
    },
    {
      name: "should not throw - OCE",
      input: {
        region: "OCE",
      },
      expected: {
        region: "OCE",
        regionGroup: "SEA",
      },
    },
    {
      name: "should not throw - PH2",
      input: {
        region: "PH2",
      },
      expected: {
        region: "PH2",
        regionGroup: "SEA",
      },
    },
    {
      name: "should not throw - SG2",
      input: {
        region: "SG2",
      },
      expected: {
        region: "SG2",
        regionGroup: "SEA",
      },
    },
    {
      name: "should not throw - TH2",
      input: {
        region: "TH2",
      },
      expected: {
        region: "TH2",
        regionGroup: "SEA",
      },
    },
    {
      name: "should not throw - TW2",
      input: {
        region: "TW2",
      },
      expected: {
        region: "TW2",
        regionGroup: "SEA",
      },
    },
    {
      name: "should not throw - VN2",
      input: {
        region: "VN2",
      },
      expected: {
        region: "VN2",
        regionGroup: "SEA",
      },
    },
  ])("$name", ({ input, expected }) => {
    const region = new Region(input.region);

    expect(region.region).toBe(expected.region);
    expect(region.regionGroup).toBe(expected.regionGroup);
  });

  it("should throw an error", () => {
    expect(() => new Region("invalid")).toThrow("Invalid region");
  });
});
