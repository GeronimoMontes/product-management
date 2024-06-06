import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableScrollProductComponent } from '../table-scroll-product/table-scroll-product.component';


describe('TableScrollProductComponent', () => {
  let component: TableScrollProductComponent;
  let fixture: ComponentFixture<TableScrollProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableScrollProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableScrollProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
