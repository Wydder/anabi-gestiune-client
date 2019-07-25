import { AssetProperty, AssetPropertyType } from '../asset-property.model';
import { Asset, IAsset } from '../asset.model';
import { Address, IAddress } from './address.model';

export interface IStorageSpace {
  id: number;
  address: IAddress;
  name: string;
  storageSpaceType: string;
  asset: IAsset;
  assetId: number;
}

export class StorageSpace extends AssetProperty {
  id: number;
  address: Address;
  name: string;
  storageSpaceType: string;

  constructor(aData?: any) {
    super(AssetPropertyType.StorageSpace);

    if (aData) {
      this.fromJson(aData);
    }
  }

  fromJson(aJson: IStorageSpace) {
    this.id = aJson.id;
    this.address = new Address(aJson.address);
    this.name = aJson.name;
    this.storageSpaceType = aJson.storageSpaceType;
    this.asset = aJson.asset ? new Asset(aJson.asset) : undefined;
    this.assetId = aJson.assetId;
  }

  toJson(): IStorageSpace {
    return {
      id: this.id,
      address: this.address ? this.address.toJson() : undefined,
      name: this.name,
      storageSpaceType: this.storageSpaceType,
      asset: this.asset ? this.asset.toJson() : undefined,
      assetId: this.assetId,
    };
  }

  getAddress(): string {
    if (!this.address) {
      return '';
    }

    // variables
    let fullAddress = '';
    let street = '';
    let city = '';

    if (this.address.county) {
      city = this.address.county.name + ' ';
      fullAddress += city
    }
    if (this.address.street) {
      street = this.address.street;
      fullAddress += street;
    }
    return fullAddress;
  }
}
