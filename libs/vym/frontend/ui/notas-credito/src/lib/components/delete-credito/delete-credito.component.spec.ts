import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCreditoComponent } from './delete-credito.component';

describe('DeleteCreditoComponent', () => {
  let component: DeleteCreditoComponent;
  let fixture: ComponentFixture<DeleteCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCreditoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
