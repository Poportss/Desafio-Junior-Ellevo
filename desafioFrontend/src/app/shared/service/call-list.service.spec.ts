/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CallListService } from './call-list.service';

describe('Service: CallList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallListService]
    });
  });

  it('should ...', inject([CallListService], (service: CallListService) => {
    expect(service).toBeTruthy();
  }));
});
