import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogListComponent } from './log-list.component';
import { LogService } from 'src/app/services/log.service';
import { of } from 'rxjs';
import { Log } from 'src/app/interfaces/log';
import { ActionType } from 'src/app/interfaces/action-type';
import { DatePipe } from '@angular/common';
import moment from 'moment-timezone';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogListComponent', () => {
  let component: LogListComponent;
  let fixture: ComponentFixture<LogListComponent>;
  let logService: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogListComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LogService,
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogListComponent);
    component = fixture.componentInstance;
    logService = TestBed.inject(LogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all logs', () => {
    const mockLogs: Log[] = [
      {
        id: 1,
        operation: 1,
        operationName: 'Test Operation 1',
        type: ActionType.CREATE,
        modifiedFields: [
          { fieldName: 'field1', oldValue: '', newValue: 'new value' }
        ],
        timestamp: '2023-05-01T12:00:00'
      },
      {
        id: 2,
        operation: 2,
        operationName: 'Test Operation 2',
        type: ActionType.UPDATE,
        modifiedFields: [
          { fieldName: 'field2', oldValue: 'old value', newValue: 'new value' }
        ],
        timestamp: '2023-05-02T15:30:00'
      }
    ];

    spyOn(logService, 'findAllLogs').and.returnValue(of(mockLogs));

    component.loadLogs();

    expect(component.logs).toEqual(mockLogs);
  });
});