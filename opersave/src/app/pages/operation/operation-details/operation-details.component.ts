import { DatePipe } from '@angular/common';
import { LogService } from './../../../services/log.service';
import { Field } from './../../../interfaces/field';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operation } from 'src/app/interfaces/operation';
import { OperationDTO } from 'src/app/interfaces/operation-dto';
import { RequestOp } from 'src/app/interfaces/request';
import { ResponseOp } from 'src/app/interfaces/response';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';
import { Log } from 'src/app/interfaces/log';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.scss']
})
export class OperationDetailsComponent implements OnChanges {
  @Input() selectedId?: number;
  @Output() operationUpdated = new EventEmitter<void>();
  operation?: Operation;
  logs: Log[] = [];
  editing: boolean = false;
  permissionsNeededAux?: boolean;
  updForm: FormGroup;
  requestData: RequestOp = { fields: [] };;
  responseData: ResponseOp = { fields: [] };;

  constructor(private fb: FormBuilder, private operationService: OperationService, private logService: LogService, private datePipe: DatePipe){ 
    this.updForm = this.fb.group({
      name: [{value: '', disabled: true}, Validators.required],
      category: [{value: '', disabled: true}, Validators.required],
      description: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(500)]],
      restrictAccess: [{value: false, disabled: true}],
      permissionsNeeded: [{value: false, disabled: true}],
      permissions: [{value: '', disabled: true}],
      request: this.fb.array([]),
      response: this.fb.array([])
    });

    this.updForm.get('permissionsNeeded')?.valueChanges.subscribe((isNeeded) => {
      const permissionsControl = this.updForm.get('permissions');
      if (isNeeded) {
        permissionsControl?.setValidators(Validators.required);
      } else {
        permissionsControl?.clearValidators();
      }
      permissionsControl?.updateValueAndValidity();
    });
  }

  ngOnChanges(): void {
    this.loadOperationById(); 
  }

  loadOperationById(){
    if(this.selectedId){
      this.operationService.findById(this.selectedId).subscribe({
        next: (data: Operation) => {
          this.operation = data;
          this.permissionsNeededAux = this.operation?.permissionsNeeded;

          this.requestData = {
            fields: this.operation.request.fields.map((field: any) => ({
              fieldName: field.fieldName,
              fieldType: field.fieldType
            }))
          };
      
          this.responseData = {
            fields: this.operation.response.fields.map((field: any) => ({
              fieldName: field.fieldName,
              fieldType: field.fieldType
            }))
          };
           
          this.requestData.fields.forEach((field: any) => {
            this.request.push(this.fb.group({
              fieldName: [field.fieldName, Validators.required],
              fieldType: [field.fieldType, Validators.required]
            }));
          });

          this.responseData.fields.forEach((field: any) => {
            this.response.push(this.fb.group({
              fieldName: [field.fieldName, Validators.required],
              fieldType: [field.fieldType, Validators.required]
            }));
          });

          this.cancelEdit();

          this.updForm.patchValue({
            name: this.operation.name,
            category: this.operation.category,
            description: this.operation.description,
            restrictAccess: this.operation.restrictAccess,
            permissionsNeeded: this.operation.permissionsNeeded,
            permissions: this.operation.permissions,
            request:  Array.from(this.requestData.fields),
            response: Array.from(this.responseData.fields)
          });

          this.loadOperationLogs();
        },
        error: (err) => {
          console.error('Error loading operation details:', err);
        }
      });
    }
  }

  loadOperationLogs(){
    this.logService.findLogsByOperationId(this.operation!.id).subscribe({
      next: (data: Log[]) => {
        this.logs = data;
      },
      error: (err) => {
        console.error('Error on loading logs:', err);
      }
    })

    console.log(this.logs);
  }

  onSubmit(){
    if(this.updForm.valid){
      this.requestData = {
        fields: this.updForm.get('request')?.value.map((field: any) => ({
          fieldName: field.fieldName,
          fieldType: field.fieldType
        }))
      };

      this.responseData = {
        fields: this.updForm.get('response')?.value.map((field: any) => ({
          fieldName: field.fieldName,
          fieldType: field.fieldType
        }))
      };

      if (this.updForm.valid) {
        const newOperation: OperationDTO = {
          name: this.updForm.get('name')?.value,
          category: this.updForm.get('category')?.value,
          description: this.updForm.get('description')?.value,
          restrictAccess: this.updForm.get('restrictAccess')?.value,
          permissionsNeeded: this.updForm.get('permissionsNeeded')?.value,
          permissions: this.updForm.get('permissions')?.value,
          request: this.requestData,
          response: this.responseData
        };

        this.operationService.updateOperation(this.operation!.id, newOperation).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Operação atualizada com sucesso!',
              icon: 'success'
            })

            this.operationUpdated.emit();
            this.loadOperationById();
          },
          error: (error) => {
            Swal.fire({
              title: 'Falha ao atualizar operação!',
              icon: 'error'
            })
          }
        });
      }else {
        console.log('Form is invalid');
      }

      this.cancelEdit();
    }else{
      Swal.fire({
        icon: "error",
        title: "Formulario inválido!",
        text: "Verifique se todos os campos da operação estão preenchidos!"
      });
    }
  }

  deleteOperation(id: number){
    Swal.fire({
      title: "Você tem certeza que quer excluir esta Operação?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationService.deleteOperation(id).subscribe(result => {
          Swal.fire({
            title: 'Operação excluída com sucesso!',
            icon: 'error'
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
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

  get request(): FormArray {
    return this.updForm.get('request') as FormArray;
  }

  get response(): FormArray {
    return this.updForm.get('response') as FormArray;
  }

  enableToEdit(){
    this.updForm.enable();
    this.editing = true;
  }

  cancelEdit(){
    this.updForm.disable();
    this.editing = false;
  }

  onPermissionsNeededChange() {
    this.permissionsNeededAux = this.updForm.get('permissionsNeeded')?.value;
  }

  formatTimestamp(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'dd MMM yyyy - HH:mm') || '';
  }

  getModifiedFieldValues(modifiedFields: { oldValue: string, newValue: string }[]) {
    return modifiedFields.map(({ oldValue, newValue }) => ({
      oldValue,
      newValue
    }));
  }
 
}
