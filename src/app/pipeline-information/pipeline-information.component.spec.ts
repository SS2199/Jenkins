import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineInformationComponent } from './pipeline-information.component';

describe('PipelineInformationComponent', () => {
  let component: PipelineInformationComponent;
  let fixture: ComponentFixture<PipelineInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipelineInformationComponent]
    });
    fixture = TestBed.createComponent(PipelineInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
