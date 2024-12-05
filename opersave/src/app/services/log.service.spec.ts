import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogService } from './log.service';
import { Log } from '../interfaces/log';
import { ActionType } from '../interfaces/action-type';
import { ModifiedField } from '../interfaces/modified-field';

describe('LogService', () => {
  let service: LogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService]
    });

    service = TestBed.inject(LogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockLogs: Log[] = [
    {
      id: 1,
      operation: 1,
      operationName: 'Operation 1',
      type: ActionType.CREATE,
      modifiedFields: [
        { fieldName: 'field1', oldValue: '', newValue: 'new value' },
        { fieldName: 'field2', oldValue: '0', newValue: '10' }
      ],
      timestamp: '2023-05-01T12:00:00'
    },
    {
      id: 2,
      operation: 2,
      operationName: 'Operation 2',
      type: ActionType.UPDATE,
      modifiedFields: [
        { fieldName: 'field3', oldValue: 'old value', newValue: 'new value' }
      ],
      timestamp: '2023-05-02T15:30:00'
    }
  ];

  it('should return an array of all logs', () => {
    service.findAllLogs().subscribe((logs: Log[]) => {
      expect(logs.length).toBe(2);
      expect(logs).toEqual(mockLogs);
    });

    const req = httpMock.expectOne('http://localhost:8080/logs');
    expect(req.request.method).toBe('GET');
    req.flush(mockLogs);
  });

  it('should return an array of logs by operation ID', () => {
    const mockLogsById: Log[] = [
      {
        id: 1,
        operation: 1,
        operationName: 'Operation 1',
        type: ActionType.CREATE,
        modifiedFields: [
          { fieldName: 'field1', oldValue: '', newValue: 'new value' },
          { fieldName: 'field2', oldValue: '0', newValue: '10' }
        ],
        timestamp: '2023-05-01T12:00:00'
      }
    ];

    service.findLogsByOperationId(1).subscribe((logs: Log[]) => {
      expect(logs.length).toBe(1);
      expect(logs).toEqual(mockLogsById);
    });

    const req = httpMock.expectOne('http://localhost:8080/logs/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockLogsById);
  });
});
