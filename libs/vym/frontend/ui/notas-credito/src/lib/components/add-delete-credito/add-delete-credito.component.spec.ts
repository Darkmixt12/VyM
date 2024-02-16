import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDeleteCreditoComponent } from './add-delete-credito.component';

describe('AddDeleteCreditoComponent', () => {
  let component: AddDeleteCreditoComponent;
  let fixture: ComponentFixture<AddDeleteCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeleteCreditoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDeleteCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
