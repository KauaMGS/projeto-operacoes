import { TestBed } from '@angular/core/testing';
import { LocalStorageDraftService } from './local-storage-draft.service';
import { OperationDTO } from '../interfaces/operation-dto';

describe('LocalStorageDraftService', () => {
  let service: LocalStorageDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDraftService]
    });

    localStorage.clear();
    service = TestBed.inject(LocalStorageDraftService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveDraft', () => {
    it('should save draft to localStorage', () => {
      const mockOperation: OperationDTO = {
        name: 'Test Operation',
        description: 'Test Description',
        category: 'Test Category',
        restrictAccess: false,
        permissionsNeeded: false,
        permissions: '',
        request: { fields: [{ fieldName: 'testField', fieldType: 'string' }] },
        response: { fields: [] }
      };

      const lastPage = 1;

      service.saveDraft(mockOperation, lastPage);

      const storedDraft = JSON.parse(localStorage.getItem('operation_draft')!);
      
      expect(storedDraft).toBeTruthy();
      expect(storedDraft.operation).toEqual(mockOperation);
      expect(storedDraft.lastPage).toBe(lastPage);
    });
  });

  describe('retrieveDraft', () => {
    it('should retrieve saved draft from localStorage', () => {
      const mockOperation: OperationDTO = {
        name: 'Test Operation',
        description: 'Test Description',
        category: 'Test Category',
        restrictAccess: false,
        permissionsNeeded: false,
        permissions: '',
        request: { fields: [{ fieldName: 'testField', fieldType: 'string' }] },
        response: { fields: [] }
      };

      const lastPage = 2;

      localStorage.setItem('operation_draft', JSON.stringify({ operation: mockOperation, lastPage }));

      const retrievedDraft = service.retrieveDraft();
      
      expect(retrievedDraft).toBeTruthy();
      expect(retrievedDraft?.operation).toEqual(mockOperation);
      expect(retrievedDraft?.lastPage).toBe(lastPage);
    });

    it('should return null when no draft exists', () => {
      const retrievedDraft = service.retrieveDraft();
      
      expect(retrievedDraft).toBeNull();
    });
  });

  describe('clearDraft', () => {
    it('should remove draft from localStorage', () => {
      const mockOperation: OperationDTO = {
        name: 'Test Operation',
        description: 'Test Description',
        category: 'Test Category',
        restrictAccess: false,
        permissionsNeeded: false,
        permissions: '',
        request: { fields: [{ fieldName: 'testField', fieldType: 'string' }] },
        response: { fields: [] }
      };

      localStorage.setItem('operation_draft', JSON.stringify({ operation: mockOperation, lastPage: 1 }));

      service.clearDraft();

      const retrievedDraft = localStorage.getItem('operation_draft');
      
      expect(retrievedDraft).toBeNull();
    });
  });
});