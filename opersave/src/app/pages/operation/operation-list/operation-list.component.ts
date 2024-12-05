import { OperationService } from '../../../services/operation.service';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Operation } from 'src/app/interfaces/operation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';
  operations: Operation[] = [];
  selectedOperationId?: number;

  constructor(private operationService: OperationService){ }

  ngOnInit(): void {
    this.loadOperations();
  }

  ngOnChanges(){
    if (this.searchQuery) {
      this.operationService.findWithFilter(this.searchQuery).subscribe({
        next: (data: Operation[]) => {
          this.operations = data;
        },
        error: (err) => {
          console.error('Error on loading filtered operations:', err);
        }
      });
    } else {
      this.operationService.findAll().subscribe({
        next: (data: Operation[]) => {
          this.operations = data;
        },
        error: (err) => {
          console.error('Error on loading operations:', err);
        }
      });
    }
  }

  loadOperations(){
    this.operationService.findAll().subscribe({
      next: (data: Operation[]) => {  
        this.operations = data;
      },
      error: (err) => {
        console.error('Error on loading operations:', err);
      },
    });
  }

  selectOperation(id: number) {
    this.selectedOperationId = id;
  }

  isRestrictAccess(){
    Swal.fire({
      icon: "error",
      title: "Acesso restrito",
      text: "Esta operação requer acesso especial para ser visualizada!"
    });
  }

}
