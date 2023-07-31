import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryMenuComponent } from './product-category-menu.component';

//Prueba unitaria en Angular para el componente ProductCategoryMenuComponent
describe('ProductCategoryMenuComponent', () => {
  let component: ProductCategoryMenuComponent;
  let fixture: ComponentFixture<ProductCategoryMenuComponent>;

  beforeEach(async () => {
    // Configurar el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryMenuComponent ]
      // Declarar el componente ProductCategoryMenuComponent que se va a probar
    })
    .compileComponents(); // Compilar los componentes
  });

  beforeEach(() => {
    // Crear una instancia del componente y su fixture (entorno de pruebas)
    fixture = TestBed.createComponent(ProductCategoryMenuComponent);
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