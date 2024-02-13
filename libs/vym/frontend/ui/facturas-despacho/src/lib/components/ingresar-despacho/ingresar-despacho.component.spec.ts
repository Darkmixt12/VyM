import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarDespachoComponent } from './ingresar-despacho.component';

describe('IngresarDespachoComponent', () => {
  let component: IngresarDespachoComponent;
  let fixture: ComponentFixture<IngresarDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresarDespachoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
