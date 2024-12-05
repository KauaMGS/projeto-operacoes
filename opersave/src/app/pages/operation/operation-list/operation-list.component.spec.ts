import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationListComponent } from './operation-list.component';
import { OperationDetailsComponent } from '../operation-details/operation-details.component';
import { OperationService } from 'src/app/services/operation.service';
import { of } from 'rxjs';
import { Operation } from 'src/app/interfaces/operation';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('OperationListComponent', () => {
  let component: OperationListComponent;
  let fixture: ComponentFixture<OperationListComponent>;
  let operationService: OperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationListComponent, OperationDetailsComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [OperationService, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationListComponent);
    component = fixture.componentInstance;
    operationService = TestBed.inject(OperationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all operations', () => {
    const mockOperations: Operation[] = [
      {
        id: 1,
        name: 'Test Operation 1',
        category: 'Test Category 1',
        description: 'Test Description 1',
        restrictAccess: false,
        permissionsNeeded: true,
        permissions: 'Admin',
        request: { fields: [{ fieldName: 'field1', fieldType: 'string' }] },
        response: { fields: [{ fieldName: 'field2', fieldType: 'number' }] }
      },
      {
        id: 2,
        name: 'Test Operation 2',
        category: 'Test Category 2',
        description: 'Test Description 2',
        restrictAccess: true,
        permissionsNeeded: false,
        permissions: 'User',
        request: { fields: [{ fieldName: 'field3', fieldType: 'boolean' }] },
        response: { fields: [{ fieldName: 'field4', fieldType: 'date' }] }
      }
    ];

    spyOn(operationService, 'findAll').and.returnValue(of(mockOperations));

    component.loadOperations();

    expect(component.operations).toEqual(mockOperations);
  });

  it('should load filtered operations', () => {
    const mockOperations: Operation[] = [
      {
        id: 1,
        name: 'Filtered Operation 1',
        category: 'Test Category 1',
        description: 'Test Description 1',
        restrictAccess: false,
        permissionsNeeded: true,
        permissions: 'Admin',
        request: { fields: [{ fieldName: 'field1', fieldType: 'string' }] },
        response: { fields: [{ fieldName: 'field2', fieldType: 'number' }] }
      }
    ];

    spyOn(operationService, 'findWithFilter').and.returnValue(of(mockOperations));

    component.searchQuery = 'Filtered';
    component.ngOnChanges();

    expect(component.operations).toEqual(mockOperations);
  });
});