import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() tabs!: string[];

  selectedTab!: string;

  constructor(
    private translocoService: TranslocoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedTab = this.tabs?.[0];
  }

  handleSelectedTab(selectedTab: string) {
    this.selectedTab = selectedTab;
    this.router.navigate(['/' + this.selectedTab]);
  }
}
