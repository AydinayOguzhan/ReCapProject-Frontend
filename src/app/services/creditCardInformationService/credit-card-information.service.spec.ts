import { TestBed } from '@angular/core/testing';

import { CreditCardInformationService } from './credit-card-information.service';

describe('CreditCardInformationService', () => {
  let service: CreditCardInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
