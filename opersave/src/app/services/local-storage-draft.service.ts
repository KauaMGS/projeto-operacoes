import { Injectable } from '@angular/core';
import { Operation } from '../interfaces/operation';
import { OperationDTO } from '../interfaces/operation-dto';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDraftService {
  private static DRAFT_KEY = 'operation_draft';

  saveDraft(operation: OperationDTO, lastpage: number){
    const draftData = {
      operation: operation,
      lastPage: lastpage
    };
    
    localStorage.setItem(LocalStorageDraftService.DRAFT_KEY, JSON.stringify(draftData));
  }

  retrieveDraft(): { operation: OperationDTO, lastPage: number } | null {
    const draft = localStorage.getItem(LocalStorageDraftService.DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  }

  clearDraft() {
    localStorage.removeItem(LocalStorageDraftService.DRAFT_KEY);
  }

}