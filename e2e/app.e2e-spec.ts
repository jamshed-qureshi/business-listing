import { NewsPage } from './app.po';

describe('news App', () => {
  let page: NewsPage;

  beforeEach(() => {
    page = new NewsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
