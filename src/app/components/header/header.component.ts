import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { headersitoTabs } from 'src/app/services/mocks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTabs = headersitoTabs;
  userIsLogged: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logged$.subscribe({
      next: (logValue) => (this.userIsLogged = logValue),
    });
  }

  onCloseSession() {
    this.authService.setUserLogged(false);
    this.router.navigate(['/login']);
  }
}
