import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OperationCreateComponent } from './operation-create.component';
import { OperationService } from 'src/app/services/operation.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Operation } from 'src/app/interfaces/operation';
import { OperationDTO } from 'src/app/interfaces/operation-dto';
import { RequestOp } from 'src/app/interfaces/request';
import { ResponseOp } from 'src/app/interfaces/response';

describe('OperationCreateComponent', () => {
  let component: OperationCreateComponent;
  let fixture: ComponentFixture<OperationCreateComponent>;
  let operationService: OperationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationCreateComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [OperationService, Router]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationCreateComponent);
    component = fixture.componentInstance;
    operationService = TestBed.inject(OperationService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate request and response fields', () => {
    const mockRequestOp: RequestOp = { fields: [{ fieldName: 'field1', fieldType: 'string' }] };
    const mockResponseOp: ResponseOp = { fields: [{ fieldName: 'field2', fieldType: 'number' }] };

    component.requestData = mockRequestOp;
    component.responseData = mockResponseOp;

    fixture.detectChanges();

    expect(component.request.controls.length).toBe(1);
    expect(component.response.controls.length).toBe(1);
  });

  it('should create a new operation', () => {
    const requestFields = [{ fieldName: 'field1', fieldType: 'string' }];
    const responseFields = [{ fieldName: 'field2', fieldType: 'number' }];

    const mockOperationDTO: OperationDTO = {
      name: 'Test Operation',
      category: 'Test Category',
      description: 'Test Description',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: { fields: [{ fieldName: 'field1', fieldType: 'string' }] },
      response: { fields: [{ fieldName: 'field2', fieldType: 'number' }] }
    };

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

    component.regForm.patchValue({
      request: { fields: requestFields },
      response: { fields: responseFields }
    });

    spyOn(operationService, 'createOperation').and.returnValue(of(mockOperation));
    spyOn(router, 'navigateByUrl');

    component.regForm.patchValue(mockOperationDTO);
    component.onSubmit();

    expect(operationService.createOperation).toHaveBeenCalledWith(mockOperationDTO);
    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  });

  it('should handle error when creating a new operation', () => {
    const mockOperationDTO: OperationDTO = {
      name: 'Test Operation',
      category: 'Test Category',
      description: 'Test Description',
      restrictAccess: false,
      permissionsNeeded: true,
      permissions: 'Admin',
      request: { fields: [{ fieldName: 'field1', fieldType: 'string' }] },
      response: { fields: [{ fieldName: 'field2', fieldType: 'number' }] }
    };

    spyOn(operationService, 'createOperation').and.returnValue(throwError(() => new Error('Error creating operation')));

    component.regForm.patchValue(mockOperationDTO);
    component.onSubmit();

    expect(operationService.createOperation).toHaveBeenCalledWith(mockOperationDTO);
  });
});