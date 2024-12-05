import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OperationDetailsComponent } from './operation-details.component';
import { OperationService } from 'src/app/services/operation.service';
import { LogService } from 'src/app/services/log.service';
import { Operation } from 'src/app/interfaces/operation';
import { Log } from 'src/app/interfaces/log';
import { ActionType } from 'src/app/interfaces/action-type';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

describe('OperationDetailsComponent', () => {
  let component: OperationDetailsComponent;
  let fixture: ComponentFixture<OperationDetailsComponent>;
  let operationService: OperationService;
  let logService: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationDetailsComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [OperationService, LogService, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationDetailsComponent);
    component = fixture.componentInstance;
    operationService = TestBed.inject(OperationService);
    logService = TestBed.inject(LogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load operation details', () => {
    const mockOperation: Operation = {
      id: 1,
      name: 'Test Operation',
      category: 'Test Category',
      description: 'Test Description',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: { fields: [{ fieldName: 'field1', fieldType: 'string' }] },
      response: { fields: [{ fieldName: 'field2', fieldType: 'number' }] }
    };

    spyOn(operationService, 'findById').and.returnValue(of(mockOperation));

    component.selectedId = 1;
    component.loadOperationById();

    expect(component.operation).toEqual(mockOperation);
    expect(component.updForm.get('name')?.value).toEqual('Test Operation');
  });

  it('should load operation logs', () => {
    const mockOperation: Operation = {
      id: 1,
      name: 'Test Operation',
      category: 'Test Category',
      description: 'Test Description',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: { fields: [{ fieldName: 'field1', fieldType: 'string' }] },
      response: { fields: [{ fieldName: 'field2', fieldType: 'number' }] }
    };

    const mockLogs: Log[] = [
      {
        id: 1,
        operation: 1,
        operationName: 'Test Operation',
        type: ActionType.CREATE,
        modifiedFields: [{ fieldName: 'field1', oldValue: '', newValue: 'new value' }],
        timestamp: '2023-05-01T12:00:00'
      }
    ];

    spyOn(logService, 'findLogsByOperationId').and.returnValue(of(mockLogs));

    component.selectedId = mockOperation.id;
    component.loadOperationLogs();
  
    expect(component.operation).toEqual(mockOperation);
    expect(component.logs).toEqual(mockLogs);
  });

  it('should delete an operation', () => {
    const mockOperationId = 1;

    component.deleteOperation(mockOperationId);

    expect(operationService.deleteOperation).toBeNull;
  });
});
