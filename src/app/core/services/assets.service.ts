import { Injectable } from '@angular/core';
import { of, zip, Observable } from 'rxjs';
import { map, mergeMap, take, toArray } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import { CoreState } from '../store/reducers/index';
import * as fromSelectors from '../store/selectors';

import { AssetsApiService } from '../http';
import {
  Address,
  AddressResponse,
  Asset,
  AssetCurrency,
  AssetDetailResponse,
  AssetMeasurement,
  AssetResponse,
  Category,
  Stage,
  StageResponse
} from '../models';

@Injectable()
export class AssetsService {
  constructor(
    private assetsApiService: AssetsApiService,
    private store: Store<CoreState>) {
  }

  public create(aAsset: Asset): Observable<Asset> {
    return this.assetsApiService.create(aAsset.toJson())
      .pipe(
        mergeMap((aAssetResponse: AssetDetailResponse) => this.assetFromDetailResponse(aAssetResponse))
      );
  }

  public update(aAsset: Asset): Observable<Asset> {
    return this.assetsApiService.update(aAsset.id, aAsset.toJson())
      .pipe(
        mergeMap((aAssetResponse: AssetDetailResponse) => this.assetFromDetailResponse(aAssetResponse))
      );
  }

  public list(): Observable<Asset[]> {
    return this.assetsApiService.list()
      .pipe(
        mergeMap(a => a),
        mergeMap((aAssetResponse: AssetResponse) => this.assetFromResponse(aAssetResponse)),
        toArray()
      );
  }

  public stages(): Observable<Stage[]> {
    return this.assetsApiService.stages()
      .pipe(
        map((aResponse: StageResponse[]) => aResponse.map(aStage => new Stage(aStage)))
      );
  }

  public createAddress(aAddress: Address): Observable<Address> {
    return this.assetsApiService.createAddress(aAddress.getAssetId(), aAddress.toJson())
      .pipe(
        map((aNewAddress: AddressResponse) => {
          const theAddress = new Address(aNewAddress);
          theAddress.setAsset(aAddress.getAsset());
          return theAddress;
        })
      );
  }

  public updateAddress(aAddress: Address): Observable<Address> {
    return this.assetsApiService.updateAddress(aAddress.getAssetId(), aAddress.toJson())
      .pipe(
        map((aNewAddress: AddressResponse) => {
          const theAddress = new Address(aNewAddress);
          theAddress.setAsset(aAddress.getAsset());
          return theAddress;
        })
      );
  }

  public measurements(): Observable<AssetMeasurement[]> {
    const measurements = [
      new AssetMeasurement({ id: 'buc', code: 'Bucati' }),
      new AssetMeasurement({ id: 'kg', code: 'Kilograme' }),
      new AssetMeasurement({ id: 'l', code: 'Litri' }),
    ];

    return of(measurements);
  }

  public currencies(): Observable<AssetCurrency[]> {
    const currencies = [
      new AssetCurrency({ id: 'ron', code: 'RON' }),
      new AssetCurrency({ id: 'eur', code: 'EUR' }),
      new AssetCurrency({ id: 'usd', code: 'USD' }),
    ];

    return of(currencies);
  }

  public loadAssetDetails(aAssetId: number) {
    return this.assetsApiService.assetDetails(aAssetId)
      .pipe(
        mergeMap((aAssetResponse: AssetDetailResponse) => this.assetFromDetailResponse(aAssetResponse))
      );
  }

  private assetFromResponse(aResponse: AssetResponse): Observable<Asset> {
    return zip(
      this.store.pipe(select(fromSelectors.getCategoryByName(aResponse.assetCategory))),
      this.store.pipe(select(fromSelectors.getCategoryByName(aResponse.assetSubcategory))),
      this.store.pipe(select(fromSelectors.getStageByName(aResponse.currentStage))),
      (aCategory: Category, aSubcategory: Category, aStage: Stage) => {
        const theAsset = new Asset();
        theAsset.fromAssetResponseJson(aResponse);
        theAsset.setCategory(aCategory);
        theAsset.setSubcategory(aSubcategory);
        theAsset.setStage(aStage);
        return theAsset;
      }
    ).pipe(
      take(1)
    );
  }

  private assetFromDetailResponse(aResponse: AssetDetailResponse): Observable<Asset> {
    return zip(
      this.store.pipe(select(fromSelectors.getCategoryById(aResponse.subcategoryId))),
      this.store.pipe(select(fromSelectors.getStageById(aResponse.stageId))),
      (aSubcategory: Category, aStage: Stage) => {
        const theAsset = new Asset();
        theAsset.fromAssetDetailResponseJson(aResponse);
        theAsset.setCategory(aSubcategory.parent);
        theAsset.setSubcategory(aSubcategory);
        theAsset.setStage(aStage);

        return theAsset;
      }
    ).pipe(
      take(1)
    );
  }
}
