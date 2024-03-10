import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePromoListComponent } from './code-promo-list.component';

describe('CodePromoListComponent', () => {
  let component: CodePromoListComponent;
  let fixture: ComponentFixture<CodePromoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodePromoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodePromoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
