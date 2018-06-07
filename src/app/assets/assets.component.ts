import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromStore from '../core/store';

import { Asset } from 'app/core';
import { AddAssetComponent } from './components/add-asset/add-asset.component';

@Component({
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})

export class AssetsComponent implements OnInit, AfterViewInit {
  public tableConfig: any;

  private assetsLoaded$: Observable<boolean>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.CoreState>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.assetsLoaded$ = this.store.select(fromStore.getAssetsLoaded);

    this.tableConfig = {
      displayedColumns: [
        'id',
        'name',
        'identifier',
        'categoryName',
        'subcategoryName',
        'stageName',
        'value',
      ],
    };

    this.refresh();
  }

  ngAfterViewInit() {
    this.tableConfig.dataSource.sort = this.sort;
    this.tableConfig.dataSource.paginator = this.paginator;
  }

  refresh() {
    this.store.select(fromStore.getAllAssets)
      .subscribe((aAssets) => {
        if (aAssets && aAssets.length > 0) {
          this.tableConfig.dataSource = new MatTableDataSource(aAssets);
        }
      });
  }

  addAsset(): void {
    const addAssetDialog = this.dialog.open(AddAssetComponent, {
      panelClass: 'dialog-add',
    } as MatDialogConfig);

    addAssetDialog.afterClosed().subscribe(result => {

    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableConfig.dataSource.filter = filterValue;
  }

  onAssetClicked(aAsset: Asset) {
    this.router.navigate(['/assets/detail', aAsset.id]);
  }
}