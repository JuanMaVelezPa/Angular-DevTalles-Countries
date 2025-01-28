import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  standalone: false,
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  public translationsArray: { key: string; value: { common: string } }[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.countriesService.searchCountryByAlphaCode(params['id'])),
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');
        this.country = country;

        if (this.country.translations) {
          this.translationsArray = Object.entries(this.country.translations).map(
            ([key, value]) => ({
              key,
              value,
            })
          );
        }

        return this.country;
      });
  }

}
