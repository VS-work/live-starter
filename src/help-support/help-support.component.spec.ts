/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HelpSupportComponent } from './help-support.component';

describe('BlogComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpSupportComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(HelpSupportComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(HelpSupportComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(HelpSupportComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
