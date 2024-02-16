import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasDeleteComponent } from './facturas-delete.component';

describe('FacturasDeleteComponent', () => {
  let component: FacturasDeleteComponent;
  let fixture: ComponentFixture<FacturasDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturasDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacturasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
