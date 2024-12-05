import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OperationService } from './operation.service';
import { Operation } from '../interfaces/operation';
import { OperationDTO } from '../interfaces/operation-dto';
import { Field } from '../interfaces/field';
import { RequestOp } from '../interfaces/request';
import { ResponseOp } from '../interfaces/response';
import { Observable } from 'rxjs';

describe('OperationService', () => {
  let service: OperationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OperationService]
    });

    service = TestBed.inject(OperationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockFields: Field[] = [
    { fieldName: 'field1', fieldType: 'string' },
    { fieldName: 'field2', fieldType: 'number' }
  ];

  const mockRequestOp: RequestOp = { fields: mockFields };
  const mockResponseOp: ResponseOp = { fields: mockFields };

  const mockOperations: Operation[] = [
    {
      id: 1,
      name: 'Operation 1',
      description: 'Description 1',
      category: 'Category 1',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: mockRequestOp,
      response: mockResponseOp
    },
    {
      id: 2,
      name: 'Operation 2',
      description: 'Description 2',
      category: 'Category 2',
      restrictAccess: true,
      permissionsNeeded: false,
      permissions: 'User',
      request: mockRequestOp,
      response: mockResponseOp
    }
  ];

  it('should return an array of operations', () => {
    service.findAll().subscribe((operations: Operation[]) => {
      expect(operations.length).toBe(2);
      expect(operations).toEqual(mockOperations);
    });

    const req = httpMock.expectOne('http://localhost:8080/operations');
    expect(req.request.method).toBe('GET');
    req.flush(mockOperations);
  });

  it('should return a single operation by ID', () => {
    const mockOperation: Operation = {
      id: 1,
      name: 'Operation 1',
      description: 'Description 1',
      category: 'Category 1',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: mockRequestOp,
      response: mockResponseOp
    };

    service.findById(1).subscribe((operation: Operation) => {
      expect(operation).toEqual(mockOperation);
    });

    const req = httpMock.expectOne('http://localhost:8080/operations/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockOperation);
  });

  it('should return a filtered list of operations', () => {
    const mockOperationsFiltered: Operation[] = [
      {
        id: 1,
        name: 'Filtered Operation 1',
        description: 'Filtered Description 1',
        category: 'Filtered Category 1',
        restrictAccess: false,
        permissionsNeeded: true,
        permissions: 'Admin',
        request: mockRequestOp,
        response: mockResponseOp
      }
    ];

    const searchText = 'Filtered';

    service.findWithFilter(searchText).subscribe((operations: Operation[]) => {
      expect(operations.length).toBe(1);
      expect(operations).toEqual(mockOperationsFiltered);
    });

    const req = httpMock.expectOne('http://localhost:8080/operations/search?text=Filtered');
    expect(req.request.method).toBe('GET');
    req.flush(mockOperationsFiltered);
  });

  it('should create a new operation', () => {
    const newOperationDTO: OperationDTO = {
      name: 'New Operation',
      description: 'New Operation Description',
      category: 'New Category',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: mockRequestOp,
      response: mockResponseOp
    };

    const createdOperation: Operation = {
      id: 1,
      name: 'New Operation',
      description: 'New Operation Description',
      category: 'New Category',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: mockRequestOp,
      response: mockResponseOp
    };

    service.createOperation(newOperationDTO).subscribe((operation: Operation) => {
      expect(operation).toEqual(createdOperation);
    });

    const req = httpMock.expectOne('http://localhost:8080/operations');
    expect(req.request.method).toBe('POST');
    req.flush(createdOperation);
  });

  it('should update an existing operation', () => {
    const updatedOperationDTO: OperationDTO = {
      name: 'Updated Operation',
      description: 'Updated Description',
      category: 'Updated Category',
      restrictAccess: true,
      permissionsNeeded: false,
      permissions: 'User',
      request: mockRequestOp,
      response: mockResponseOp
    };

    const updatedOperation: Operation = {
      id: 1,
      name: 'Updated Operation',
      description: 'Updated Description',
      category: 'Updated Category',
      restrictAccess: true,
      permissionsNeeded: false,
      permissions: 'User',
      request: mockRequestOp,
      response: mockResponseOp
    };

    service.updateOperation(1, updatedOperationDTO).subscribe((operation: Operation) => {
      expect(operation).toEqual(updatedOperation);
    });

    const req = httpMock.expectOne('http://localhost:8080/operations/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedOperation);
  });

  it('should delete an operation', () => {
    service.deleteOperation(1).subscribe((response: void) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/operations/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});