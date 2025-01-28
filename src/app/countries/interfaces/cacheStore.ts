import { Country } from "./country"
import { Region } from "./region.type"

export interface CacheStore {
  byCapital: TermCountry,
  byCountries: TermCountry,
  byRegion: RegionCountries,
}

export interface TermCountry {
  term: string,
  countries: Country[]
}

export interface RegionCountries {
  region: Region,
  countries: Country[]
}
