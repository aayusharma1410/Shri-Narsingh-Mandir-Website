
export interface LocationOption {
  value: string;
  label: string;
}

export interface CountryData {
  value: string;
  label: string;
  states: StateData[];
}

export interface StateData {
  value: string;
  label: string;
  cities: LocationOption[];
}

// Sample location data - in a real app, you might want to use a more complete dataset
export const countryData: CountryData[] = [
  {
    value: "india",
    label: "India",
    states: [
      {
        value: "delhi",
        label: "Delhi",
        cities: [
          { value: "new-delhi", label: "New Delhi" },
          { value: "delhi-ncr", label: "Delhi NCR" }
        ]
      },
      {
        value: "maharashtra",
        label: "Maharashtra",
        states: [
          { value: "mumbai", label: "Mumbai" },
          { value: "pune", label: "Pune" },
          { value: "nagpur", label: "Nagpur" }
        ]
      },
      {
        value: "uttar-pradesh",
        label: "Uttar Pradesh",
        cities: [
          { value: "lucknow", label: "Lucknow" },
          { value: "kanpur", label: "Kanpur" },
          { value: "varanasi", label: "Varanasi" }
        ]
      }
    ]
  },
  {
    value: "usa",
    label: "United States",
    states: [
      {
        value: "california",
        label: "California",
        cities: [
          { value: "los-angeles", label: "Los Angeles" },
          { value: "san-francisco", label: "San Francisco" },
          { value: "san-diego", label: "San Diego" }
        ]
      },
      {
        value: "new-york",
        label: "New York",
        cities: [
          { value: "new-york-city", label: "New York City" },
          { value: "buffalo", label: "Buffalo" },
          { value: "albany", label: "Albany" }
        ]
      },
      {
        value: "texas",
        label: "Texas",
        cities: [
          { value: "houston", label: "Houston" },
          { value: "austin", label: "Austin" },
          { value: "dallas", label: "Dallas" }
        ]
      }
    ]
  }
];

export const getStatesForCountry = (countryValue: string): StateData[] => {
  const country = countryData.find(c => c.value === countryValue);
  return country?.states || [];
};

export const getCitiesForState = (countryValue: string, stateValue: string): LocationOption[] => {
  const country = countryData.find(c => c.value === countryValue);
  const state = country?.states.find(s => s.value === stateValue);
  return state?.cities || [];
};
