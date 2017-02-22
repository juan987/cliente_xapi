import { ClienteXapiPage } from './app.po';

describe('cliente-xapi App', function() {
  let page: ClienteXapiPage;

  beforeEach(() => {
    page = new ClienteXapiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
