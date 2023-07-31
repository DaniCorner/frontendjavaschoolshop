import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListAdminComponent } from './category-list-admin.component';

describe('CategoryListAdminComponent', () => {
  let component: CategoryListAdminComponent;
  let fixture: ComponentFixture<CategoryListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
