import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';

import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  standalone: false,
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {

  public title: string = 'Buscar por pais...';
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
    this.countries = this.countriesService.cacheStore.byCountries.countries;
  }

  searchByCountry(term: string) {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
      .subscribe(
        (resp) => {
          this.countries = resp;
          this.isLoading = false;
        })
  }

}
