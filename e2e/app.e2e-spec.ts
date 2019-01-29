import { AppPage } from './app.po';

describe('rideshare-client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

/*   it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  }); */

  it('should have title', ()=>{
    page.navigateTo();
    expect(page.getTitleText()).not.toBe(null);
    //.toEqual('RideshareClient');
  })

});
