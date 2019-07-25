import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '@app/core';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.scss'],
})
export class ViewAddressComponent {
  @Input() address: Address;
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();

  edit() {
    this.onEdit.emit(null);
  }
}
