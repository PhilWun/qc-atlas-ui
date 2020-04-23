import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SdkService } from '../../../services/sdk.service';
import { Sdk } from '../../../model/sdk.model';
import { ImportDialogComponent } from '../../importer/import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sdks',
  templateUrl: './sdks.component.html',
  styleUrls: ['./sdks.component.scss']
})
export class SdksComponent implements OnInit {

  activeIndex = 2;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  sdks: Array<Sdk> = [];
  selectedSdk: Sdk;

  selectedColor = 'primary';

  constructor(private router: Router, private sdkService: SdkService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllSdks();
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate([environment.OVERVIEW_PAGE + this.tabs[this.activeIndex]]);
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      data => {
        console.log(data);
        this.sdks = data.sdkDtos;
        if (!this.selectedSdk && this.sdks.length > 0) {
          this.sdkSelected(this.sdks[0]);
        }
      }
    );
  }

  getSdkColor(id: number): string {
    if (!this.selectedSdk) {
      return null;
    }
    if (id === this.selectedSdk.id) {
      return this.selectedColor;
    }
    return null;
  }

  sdkSelected(sdk: Sdk): void {
    this.selectedSdk = sdk;
  }

  importJSON(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new SDKs'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sdkService.createSdk(result).subscribe(
          data => {
            this.sdks.push(data);
            this.snackBar.open('Successfully added new SDK', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  addSdk(): void {
  }
}
