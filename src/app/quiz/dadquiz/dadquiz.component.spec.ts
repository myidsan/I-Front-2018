import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadquizComponent } from './dadquiz.component';

describe('DadquizComponent', () => {
  let component: DadquizComponent;
  let fixture: ComponentFixture<DadquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
