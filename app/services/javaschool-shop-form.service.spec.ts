import { TestBed } from '@angular/core/testing';

import { JavaSchoolShopFormService } from './javaschool-shop-form.service';

describe('Luv2ShopFormService', () => {
  let service: JavaSchoolShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaSchoolShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
