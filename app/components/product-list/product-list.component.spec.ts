import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

//prueba unitaria en Angular para el componente ProductListComponent
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    // Configurar el entorno de pruebas
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
      // Declarar el componente ProductListComponent que se va a probar
    })
    .compileComponents(); // Compilar los componentes
  }));

  beforeEach(() => {
    // Crear una instancia del componente y su fixture (entorno de pruebas)
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Realizar detección de cambios en el componente
  });

  it('should create', () => {
    // Prueba: el componente debe ser creado correctamente
    expect(component).toBeTruthy();
    // Verificar que el componente existe (no es nulo)
  });
});
