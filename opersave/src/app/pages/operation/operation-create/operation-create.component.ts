import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OperationDTO } from 'src/app/interfaces/operation-dto';
import { RequestOp } from 'src/app/interfaces/request';
import { ResponseOp } from 'src/app/interfaces/response';
import { LocalStorageDraftService } from 'src/app/services/local-storage-draft.service';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.scss']
})
export class OperationCreateComponent {
  regForm: FormGroup;
  currentTab = 0;
  steps = [0, 1, 2, 3, 4];
  requestData: RequestOp = { fields: [] };;
  responseData: ResponseOp = { fields: [] };;

  constructor(private fb: FormBuilder, private operationService: OperationService, private router: Router, private draftService: LocalStorageDraftService) {
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      restrictAccess: [false],
      permissionsNeeded: [false],
      permissions: [''],
      request: this.fb.array([]),
      response: this.fb.array([])
    });

    this.regForm.get('permissionsNeeded')?.valueChanges.subscribe((isNeeded) => {
      const permissionsControl = this.regForm.get('permissions');
      if (isNeeded) {
        permissionsControl?.setValidators(Validators.required);
      } else {
        permissionsControl?.clearValidators();
      }
      permissionsControl?.updateValueAndValidity();
    });

    this.retrieveDraftIfExist();
  }

  get request(): FormArray {
    return this.regForm.get('request') as FormArray;
  }

  get response(): FormArray {
    return this.regForm.get('response') as FormArray;
  }

  addField(type: 'request' | 'response') {
    const fieldGroup = this.fb.group({
      fieldName: ['', Validators.required],
      fieldType: ['', Validators.required]
    });
  
    if (type === 'request') {
      this.request.push(fieldGroup);
    } else {
      this.response.push(fieldGroup);
    }
  }
  
  removeField(type: 'request' | 'response', index: number) {
    if (type === 'request') {
      this.request.removeAt(index);
    } else {
      this.response.removeAt(index);
    }
  }

  nextStep() {
    if (this.currentTab === 0) {
      if (this.regForm.invalid) {
        this.regForm.markAllAsTouched();
        return;
      }
    }

    if (this.currentTab === 2 && this.regForm.get('permissionsNeeded')?.value && this.regForm.get('permissions')?.invalid) {
      this.regForm.get('permissions')?.markAsTouched();
      return;
    }

    if (this.currentTab ===3){
      this.setRequestResponseData();
    }

    if (this.currentTab === 4) {
      this.onSubmit();
    } else {
      this.currentTab++;
    }
  }

  prevStep() {
    if (this.currentTab > 0) {
      this.currentTab--;
    }
  }

  onSubmit() {
    this.setRequestResponseData();

    if (this.regForm.valid) {
      const operationDTO: OperationDTO = {
        name: this.regForm.get('name')?.value,
        category: this.regForm.get('category')?.value,
        description: this.regForm.get('description')?.value,
        restrictAccess: this.regForm.get('restrictAccess')?.value,
        permissionsNeeded: this.regForm.get('permissionsNeeded')?.value,
        permissions: this.regForm.get('permissions')?.value,
        request: this.requestData,
        response: this.responseData
      };
  
      this.operationService.createOperation(operationDTO).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Operação criada com sucesso!',
            icon: 'success'
          })
          this.router.navigateByUrl('');
        },
        error: (error) => {
          Swal.fire({
            title: 'Falha ao criar operação!',
            icon: 'error'
          })
        }
      });

      this.draftService.clearDraft();
    } else {
      console.log('Form is invalid');
    }
    
  }

  setRequestResponseData(){
    this.requestData = {
      fields: this.regForm.get('request')?.value.map((field: any) => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType
      }))
    };

    this.responseData = {
      fields: this.regForm.get('response')?.value.map((field: any) => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType
      }))
    };
  }

  saveDraftOperation(){
    this.draftService.clearDraft();

    this.setRequestResponseData();

    const operationDraft: OperationDTO = {
      name: this.regForm.get('name')?.value,
      category: this.regForm.get('category')?.value,
      description: this.regForm.get('description')?.value,
      restrictAccess: this.regForm.get('restrictAccess')?.value,
      permissionsNeeded: this.regForm.get('permissionsNeeded')?.value,
      permissions: this.regForm.get('permissions')?.value,
      request: this.requestData,
      response: this.responseData
    };

    this.draftService.saveDraft(operationDraft, this.currentTab);

    Swal.fire({
      title: 'O rascunho da operação foi salvo!',
      icon: 'info'
    })
    this.regForm.reset(); 
    this.currentTab = 0;
    this.router.navigateByUrl('');
  }

  retrieveDraftIfExist(){
    const draftOperation = this.draftService.retrieveDraft();

    if(draftOperation){
      this.regForm.patchValue({
        name: draftOperation.operation.name,
        category: draftOperation.operation.category,
        description: draftOperation.operation.description,
        restrictAccess: draftOperation.operation.restrictAccess,
        permissionsNeeded: draftOperation.operation.permissionsNeeded,
        permissions: draftOperation.operation.permissions
      });

      if(draftOperation.operation.request.fields.length > 0){
        this.requestData = draftOperation.operation.request;
        this.responseData = draftOperation.operation.response;

        draftOperation.operation.request.fields.forEach(field => {
          this.addField('request');
        });
        draftOperation.operation.response.fields.forEach(field => {
          this.addField('response');
        });

        this.regForm.get('request')?.setValue(this.requestData.fields);
        this.regForm.get('response')?.setValue(this.responseData.fields);
      }

      this.currentTab = draftOperation!.lastPage;

      Swal.fire({
        title: 'Rascunho Recuperado',
        text: 'Sua operação anterior foi carregada e está pronta para ser continuada.',
        icon: 'info',
        confirmButtonColor: '#0d6efd'
      });
    }

  }

  cancelOperation() {
    Swal.fire({
      title: "Deseja salvar o rascunho desta operação?",
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: "Continuar editando",
      denyButtonText: `Descartar`,
      confirmButtonText: "Salvar e fechar",
      customClass: {
        denyButton: 'btn btn-outline-primary mt-5 me-3 ms-2',
        confirmButton: 'btn btn-primary mt-5 me-3',      
        cancelButton: 'btn btn-secondary mt-5 me-5'   
      },
      reverseButtons: true,
      buttonsStyling: false 
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDraftOperation();

        Swal.fire({
          title: "Rascunho salvo!",
          icon: "success",
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          this.regForm.reset();
          this.currentTab = 0;
          this.router.navigateByUrl('');
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Operação descartada!', 
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
            this.draftService.clearDraft();
            this.regForm.reset();
            this.currentTab = 0;
            this.router.navigateByUrl('');
        });

      }

    });
  }

  getOperationSummary(): OperationDTO {
    return {
      name: this.regForm.get('name')?.value,
      category: this.regForm.get('category')?.value,
      description: this.regForm.get('description')?.value,
      restrictAccess: this.regForm.get('restrictAccess')?.value,
      permissionsNeeded: this.regForm.get('permissionsNeeded')?.value,
      permissions: this.regForm.get('permissions')?.value,
      request: this.requestData?.fields ? this.requestData : { fields: [] },
      response: this.responseData?.fields ? this.responseData : { fields: [] }
    };
  }

}