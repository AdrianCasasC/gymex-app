import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() tabs!: string[];

  selectedTab$!: Observable<string>;

  constructor(
    private readonly router: Router,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.selectedTab$ = this.dataService._selectedTab$;
  }

  handleSelectedTab(selectedTab: string) {
    this.dataService.setTabValue(selectedTab);
    this.router.navigate(['/' + this.dataService.getSelectedTabValue()]);
  }
}
