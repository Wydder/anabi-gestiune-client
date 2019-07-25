import { Component, Input } from '@angular/core';
import { Address } from '@app/core';

export enum AddressState {
  View = 'view',
  Edit = 'edit',
}

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.scss'],
})
export class ViewAddressComponent {
  @Input() address: Address;

  private state: AddressState = AddressState.View;

  isStateView(): boolean {
    return this.state === AddressState.View;
  }

  isStateEdit(): boolean {
    return this.state === AddressState.Edit;
  }

  editAddress() {
    this.setStateEdit();
  }

  private setStateEdit() {
    this.state = AddressState.Edit;
  }

  private setStateView() {
    this.state = AddressState.View;
  }
}
