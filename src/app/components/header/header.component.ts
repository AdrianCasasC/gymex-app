import { Component } from '@angular/core';
import { headersitoTabs } from 'src/app/services/mocks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  headerTabs = headersitoTabs;
}
