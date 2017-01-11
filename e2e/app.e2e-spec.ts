import { LiveStarterPage } from './app.po';

describe('live-starter App', function() {
  let page: LiveStarterPage;

  beforeEach(() => {
    page = new LiveStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
