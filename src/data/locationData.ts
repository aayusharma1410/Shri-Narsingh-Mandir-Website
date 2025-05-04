
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
        cities: [
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
      },
      {
        value: "karnataka",
        label: "Karnataka",
        cities: [
          { value: "bangalore", label: "Bangalore" },
          { value: "mysore", label: "Mysore" },
          { value: "hubli", label: "Hubli" }
        ]
      },
      {
        value: "tamil-nadu",
        label: "Tamil Nadu",
        cities: [
          { value: "chennai", label: "Chennai" },
          { value: "coimbatore", label: "Coimbatore" },
          { value: "madurai", label: "Madurai" }
        ]
      },
      {
        value: "gujarat",
        label: "Gujarat",
        cities: [
          { value: "ahmedabad", label: "Ahmedabad" },
          { value: "surat", label: "Surat" },
          { value: "vadodara", label: "Vadodara" }
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
          { value: "san-diego", label: "San Diego" },
          { value: "sacramento", label: "Sacramento" }
        ]
      },
      {
        value: "new-york",
        label: "New York",
        cities: [
          { value: "new-york-city", label: "New York City" },
          { value: "buffalo", label: "Buffalo" },
          { value: "albany", label: "Albany" },
          { value: "rochester", label: "Rochester" }
        ]
      },
      {
        value: "texas",
        label: "Texas",
        cities: [
          { value: "houston", label: "Houston" },
          { value: "austin", label: "Austin" },
          { value: "dallas", label: "Dallas" },
          { value: "san-antonio", label: "San Antonio" }
        ]
      },
      {
        value: "florida",
        label: "Florida",
        cities: [
          { value: "miami", label: "Miami" },
          { value: "orlando", label: "Orlando" },
          { value: "tampa", label: "Tampa" },
          { value: "jacksonville", label: "Jacksonville" }
        ]
      },
      {
        value: "illinois",
        label: "Illinois",
        cities: [
          { value: "chicago", label: "Chicago" },
          { value: "springfield", label: "Springfield" },
          { value: "peoria", label: "Peoria" }
        ]
      }
    ]
  },
  {
    value: "uk",
    label: "United Kingdom",
    states: [
      {
        value: "england",
        label: "England",
        cities: [
          { value: "london", label: "London" },
          { value: "manchester", label: "Manchester" },
          { value: "birmingham", label: "Birmingham" },
          { value: "liverpool", label: "Liverpool" }
        ]
      },
      {
        value: "scotland",
        label: "Scotland",
        cities: [
          { value: "edinburgh", label: "Edinburgh" },
          { value: "glasgow", label: "Glasgow" },
          { value: "aberdeen", label: "Aberdeen" }
        ]
      },
      {
        value: "wales",
        label: "Wales",
        cities: [
          { value: "cardiff", label: "Cardiff" },
          { value: "swansea", label: "Swansea" },
          { value: "newport", label: "Newport" }
        ]
      }
    ]
  },
  {
    value: "canada",
    label: "Canada",
    states: [
      {
        value: "ontario",
        label: "Ontario",
        cities: [
          { value: "toronto", label: "Toronto" },
          { value: "ottawa", label: "Ottawa" },
          { value: "hamilton", label: "Hamilton" }
        ]
      },
      {
        value: "quebec",
        label: "Quebec",
        cities: [
          { value: "montreal", label: "Montreal" },
          { value: "quebec-city", label: "Quebec City" },
          { value: "laval", label: "Laval" }
        ]
      },
      {
        value: "british-columbia",
        label: "British Columbia",
        cities: [
          { value: "vancouver", label: "Vancouver" },
          { value: "victoria", label: "Victoria" },
          { value: "surrey", label: "Surrey" }
        ]
      }
    ]
  },
  {
    value: "australia",
    label: "Australia",
    states: [
      {
        value: "new-south-wales",
        label: "New South Wales",
        cities: [
          { value: "sydney", label: "Sydney" },
          { value: "newcastle", label: "Newcastle" },
          { value: "wollongong", label: "Wollongong" }
        ]
      },
      {
        value: "victoria",
        label: "Victoria",
        cities: [
          { value: "melbourne", label: "Melbourne" },
          { value: "geelong", label: "Geelong" },
          { value: "ballarat", label: "Ballarat" }
        ]
      },
      {
        value: "queensland",
        label: "Queensland",
        cities: [
          { value: "brisbane", label: "Brisbane" },
          { value: "gold-coast", label: "Gold Coast" },
          { value: "cairns", label: "Cairns" }
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
