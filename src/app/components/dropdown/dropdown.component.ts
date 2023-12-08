import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Output() selectedOption = new EventEmitter();

  showOptions: boolean = false;
  optionSelected: string = '';

  constructor() {}

  onSelectedOption(option: string) {
    this.optionSelected = option;
    this.showOptions = false;
    this.selectedOption.emit(option);
  }

  onHandleDropdown() {
    this.showOptions = !this.showOptions;
  }
}
