import { Log } from 'src/app/interfaces/log';
import { LogService } from '../../../services/log.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from 'moment-timezone';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];

  constructor(private logService: LogService, private datePipe: DatePipe){ }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(){
    this.logService.findAllLogs().subscribe({
      next: (data: Log[]) => {  
        this.logs = data;
      },
      error: (err) => {
        console.error('Error on loading logs:', err);
      },
    });
  }

  formatTimestamp(timestamp: string): string {
    const brasiliaTz = 'America/Sao_Paulo';
    const formattedTimestamp = moment.tz(timestamp, brasiliaTz).format('DD MMM YYYY - HH:mm');
    return formattedTimestamp;
  }

  getModifiedFieldValues(modifiedFields: { oldValue: string, newValue: string }[]) {
    return modifiedFields.map(({ oldValue, newValue }) => ({
      oldValue,
      newValue
    }));
  }

}