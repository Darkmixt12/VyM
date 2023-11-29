import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespachoScamComponent } from './despacho.component';

describe('DespachoScamComponent', () => {
  let component: DespachoScamComponent;
  let fixture: ComponentFixture<DespachoScamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DespachoScamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DespachoScamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
