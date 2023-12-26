import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gymEx-app';

  constructor(private readonly authService: AuthService) {}

  /*@HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any): void {
    this.authService.setUserLogged(false);
  }*/

  ngOnInit(): void {
    const storedUser: string | null = localStorage.getItem('currentUser');
    if (storedUser) {
      this.authService.setUser(JSON.parse(storedUser));
      this.authService.setUserLogged(true);
    }
  }
}
