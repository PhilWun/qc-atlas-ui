import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../../model/provider.model';
import { ProviderService } from '../../services/provider.service';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProviderDialogComponent } from './dialogs/add-provider-dialog.component';
import { EntityCreator } from '../../util/entity.creator';
import { UtilService } from '../../util/util.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  selectedProvider: Provider;

  isSelectedColor = 'primary';


  constructor(private router: Router, private providerService: ProviderService,
              public dialog: MatDialog, private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  getColorOfProviderButton(id: number): string {
    if (!this.selectedProvider) {
      return null;
    }
    if (id === this.selectedProvider.id) {
      return this.isSelectedColor;
    }
  }

  makeSelectedProvider(provider: Provider): void {
    this.selectedProvider = provider;
  }

  createProviderWithJson(): void {
    const dialogRef = this.utilService.createDialog(JsonImportDialogComponent, 'Provider');

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.providerService.createProviderWithJson(dialogResult).subscribe(
          providerResult => {
            this.processProviderResult(providerResult);
          }
        );
      }
    });
  }

  createProvider(): void {
    const dialogRef = this.utilService.createDialog(AddProviderDialogComponent, 'Provider');

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const provider: Provider = EntityCreator.createProviderFromDialogResult(dialogResult);
        this.providerService.createProvider(provider).subscribe(
          providerResult => {
            this.processProviderResult(providerResult);
          }
        );
      }
    });
  }

  private getAllProviders(): void {
    this.providerService.getAllProviders().subscribe(
      providers => {
        this.providers = providers.providerDtoList;
        this.selectInitialProvider();
      }
    );
  }

  private selectInitialProvider() {
    if (!this.selectedProvider && this.providers.length > 0) {
      this.makeSelectedProvider(this.providers[0]);
    }
  }

  private processProviderResult(providerResult: Provider): void {
    this.providers.push(providerResult);
    this.selectedProvider = providerResult;
    this.utilService.callSnackBar('Provider');
  }
}
