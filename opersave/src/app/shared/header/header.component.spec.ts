import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes([])], // Configura o RouterTestingModule com rotas vazias
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Injeta o Router do RouterTestingModule
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the logs page', () => {
    spyOn(router, 'navigateByUrl'); // Espiona o método navigateByUrl

    // Simula a navegação (adicione o método que chama a navegação no componente, se necessário)
    component.viewLogs();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/logs');
  });
});
