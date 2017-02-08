import {
  Component,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-genres-filter',
  templateUrl: './genres-filter.component.html',
  styleUrls: ['./genres-filter.component.css']
})

export class GenresFilterComponent {

  public genres: any[];
  public search = '';
  public isOpenGenresFilter = false;

  @HostListener('document:click', ['$event'])

  public openCloseCountriesFilter(isOpenGenresFilter: boolean): void {
    this.isOpenGenresFilter = !isOpenGenresFilter;
    this.search = '';
  }
}
