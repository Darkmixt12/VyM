import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasCreditoComponent } from './notas-credito.component';

describe('NotasCreditoComponent', () => {
  let component: NotasCreditoComponent;
  let fixture: ComponentFixture<NotasCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasCreditoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotasCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
