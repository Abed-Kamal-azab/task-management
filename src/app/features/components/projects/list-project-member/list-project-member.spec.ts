import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectMember } from './list-project-member';

describe('ListProjectMember', () => {
  let component: ListProjectMember;
  let fixture: ComponentFixture<ListProjectMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProjectMember],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProjectMember);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
