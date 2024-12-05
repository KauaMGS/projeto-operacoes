import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search value', () => {
    const searchQuery = 'Filtered';
    spyOn(component.emmitSearch, 'emit');

    component.search(searchQuery);

    expect(component.emmitSearch.emit).toHaveBeenCalledWith(searchQuery);
  });
});