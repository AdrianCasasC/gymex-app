import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() label!: string;
  @Input() showOptions!: BehaviorSubject<boolean>;
  @Output() selectedOption = new EventEmitter();

  optionSelected: string = '';

  constructor() {}

  onSelectedOption(option: string) {
    this.optionSelected = option;
    this.showOptions.next(false);
    this.selectedOption.emit(option);
  }

  onDropdownClick() {
    this.showOptions.next(!this.showOptions.value);
  }
}
