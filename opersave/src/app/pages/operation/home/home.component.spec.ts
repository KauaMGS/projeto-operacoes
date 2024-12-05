import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchComponent } from 'src/app/shared/search/search.component'; 
import { HeaderComponent } from 'src/app/shared/header/header.component'; 
import { RouterTestingModule } from '@angular/router/testing';
import { OperationListComponent } from '../operation-list/operation-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router'; 
import { OperationDetailsComponent } from '../operation-details/operation-details.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, SearchComponent, HeaderComponent, OperationListComponent, OperationDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the create page', () => {
    spyOn(router, 'navigateByUrl'); 

    component.openCreatePage();

    expect(router.navigateByUrl).toHaveBeenCalledWith('create');
  });

  it('should update the search query', () => {
    const searchQuery = 'Filtered';

    component.updateSearchQuery(searchQuery);

    expect(component.searchQuery).toEqual(searchQuery);
  });
});
