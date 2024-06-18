import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationPanelComponent } from './pagination-panel.component';

describe('PaginationPanelComponent', () => {
  let component: PaginationPanelComponent;
  let fixture: ComponentFixture<PaginationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
