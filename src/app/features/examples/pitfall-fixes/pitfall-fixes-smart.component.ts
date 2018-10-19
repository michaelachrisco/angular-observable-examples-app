import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
}                          from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
}                          from '@angular/forms';

import {
  from,
  Observable,
  Subscription,
}                          from 'rxjs';
import {
  concatMap,
  map,
  mergeMap,
  switchMap,
}                          from 'rxjs/operators';

import { Company }         from '../../../core/models/company';
import { CompanyService }  from 'src/app/core/services/company.service';
import {
  Employee,
  mockEmployeeList,
}                          from '../../../core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ToastService }    from '../../../core/services/toast.service';
import { TableColumns }    from '../../../core/models/table-columns';

@Component({
  selector        : 'app-pitfall-fixes-smart',
  templateUrl     : './pitfall-fixes-smart.component.html',
  styleUrls       : ['./pitfall-fixes-smart.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class PitfallFixesSmartComponent implements OnInit {
  public companyList: Company[];
  public companyList$: Observable<Company[]>;
  public displayedColumns: TableColumns[] = [
    {
      columnId: 'firstName',
      columnName: 'First Name',
    },
    {
      columnId: 'lastName',
      columnName: 'Last Name',
    },
    {
      columnId: 'jobTitle',
      columnName: 'Job Title',
    },
    {
      columnId: 'companyName',
      columnName: 'Employed at',
    },
  ];
  public employeeList$: Observable<Employee[]>;
  public form: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(
    private companyService: CompanyService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.initializeFormSubscription();
    this.getCompanyList();
  }

  public updateCompanyConcat(): void {
    const concatMapControlSubscription: Subscription = from(this.companyList)
      .pipe(concatMap((company: Company) => {
        const payload = { ...company };
        payload.isSelected = !(payload.isSelected);
        return this.companyService.updateCompany(payload);
      }))
      .subscribe();
    this.subscriptions.push(concatMapControlSubscription);
  }

  public toggleEmployeeState(employee: Employee): void {
    const payload = { ...employee };
    payload.isFoo = !(payload.isFoo);
    const toggleEmployeeSubscription: Subscription = this.employeeService.updateEmployee(payload).subscribe();
    this.subscriptions.push(toggleEmployeeSubscription);
  }

  private getCompanyList(): void {
    this.companyList$ = this.companyService.getCompanyList().pipe(
      map(response => this.companyList = response),
    );
  }

  private initializeFormSubscription(): void {
    this.employeeList$ = this.selectedCompanyControl.valueChanges.pipe(
      switchMap((companyKey: string) => {
        return this.employeeService.getEmployeesByCompanyKey(companyKey).pipe(
          map(employees => {
            return { companyKey, employees };
          })
        );
      }),
      mergeMap((companyAndEmployees: { companyKey: string; employees: Employee[]; }) => {
        const company: Company = this.companyList.find(foundCompany => foundCompany.key === companyAndEmployees.companyKey);
        const employeeCount: number = this.countActiveEmployees(companyAndEmployees.employees).length;
        return this.updateCompanyAndToast(company, employeeCount).pipe(
          map(() => companyAndEmployees.employees));
      }),
    );
  }

  private updateCompanyAndToast(company: Company, employeeCount: number): Observable<Company> {
    this.displayActiveToast(employeeCount, company.companyName);
    company.employeeCount = employeeCount;
    return this.companyService.updateCompany(company);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      selectedCompany: '',
    });
  }

  private countActiveEmployees(employeeList: Employee[]): Employee[] {
    const activeEmployees: Employee[] = employeeList.filter(employee => employee.isFoo);

    return activeEmployees;
  }

  private displayActiveToast(isActiveCount: number, companyName: string): void {
    const description: string = (isActiveCount > 1)
      ? `There are ${isActiveCount} active employees for ${companyName}.`
      : `There is ${isActiveCount} active employee for ${companyName}`;
    const message = {
      header: 'Attention',
      description,
    };
    this.toastService.showToastSuccess(message);
  }

  private get selectedCompanyControl(): AbstractControl {
    return this.form.get('selectedCompany');
  }
}
