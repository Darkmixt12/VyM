import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasResponsablesComponent } from './facturas-responsables.component';

describe('FacturasResponsablesComponent', () => {
  let component: FacturasResponsablesComponent;
  let fixture: ComponentFixture<FacturasResponsablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturasResponsablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacturasResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
