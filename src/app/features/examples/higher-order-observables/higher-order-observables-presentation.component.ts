import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
}                    from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Company }   from 'src/app/core/models/company';

@Component({
  selector        : 'app-higher-order-observables-presentation',
  templateUrl     : './higher-order-observables-presentation.component.html',
  styleUrls       : ['./higher-order-observables-presentation.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class HigherOrderObservablesPresentationComponent {
  @Input() public companyList: Company[];
  @Input() public companyListSwitch: Company[];
  @Input() public companyListExhaust: Company[];
  @Input() public form: FormGroup;

  @Output() public emitForkJoin: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitCombineLatest: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitPairwise: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitConcatMap: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitMergeMap: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitSwitchMap: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitExhaustMap: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitCompanyConcat: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitCompanyMerge: EventEmitter<void> = new EventEmitter<void>();
  @Output() public emitReset: EventEmitter<void> = new EventEmitter<void>();

  public getForkJoin(): void {
    this.emitForkJoin.emit();
  }

  public getCombineLatest(): void {
    this.emitCombineLatest.emit();
  }

  public getPairwise(): void {
    this.emitPairwise.emit();
  }

  public getConcatMap(): void {
    this.emitConcatMap.emit();
  }

  public getMergeMap(): void {
    this.emitMergeMap.emit();
  }

  public getSwitchMap(): void {
    this.emitSwitchMap.emit();
  }

  public getExhaustMap(): void {
    this.emitExhaustMap.emit();
  }

  public updateCompanyConcat(): void {
    this.emitCompanyConcat.emit();
  }

  public updateCompanyMerge(): void {
    this.emitCompanyMerge.emit();
  }

  public resetCompanyNames(): void {
    this.emitReset.emit();
  }
}