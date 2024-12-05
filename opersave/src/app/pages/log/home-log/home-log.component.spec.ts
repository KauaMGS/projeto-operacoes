import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeLogComponent } from './home-log.component';
import { LogListComponent } from '../log-list/log-list.component';
import { HeaderComponent } from 'src/app/shared/header/header.component'; 
import { OperationListComponent } from '../../operation/operation-list/operation-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('HomeLogComponent', () => {
  let component: HomeLogComponent;
  let fixture: ComponentFixture<HomeLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeLogComponent, LogListComponent, HeaderComponent, OperationListComponent],
      providers: [DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});