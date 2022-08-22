/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TasksModalComponent } from './tasks-modal.component';

describe('TasksModalComponent', () => {
  let component: TasksModalComponent;
  let fixture: ComponentFixture<TasksModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
