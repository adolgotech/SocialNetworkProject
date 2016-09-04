var db = require('../../db');
var expect = require('chai').expect;

describe('making a post', function() {
  it('logs in and creates a new post', function(){
    // go to homepage
    browser.get('http://localhost:3001');
    // register user
    element(by.css('nav .register')).click();
    element(by.model('username')).sendKeys('andtay1');
    element(by.model('password')).sendKeys('FiReal');
    element(by.css('form .btn')).click();
    // click 'login'
    // element(by.css('nav .login')).click();
    // fill out and submit login form
    element(by.model('username')).sendKeys('andtay1');
    element(by.model('password')).sendKeys('FiReal');
    element(by.css('form .btn')).click();
    // submit a new post on the posts page
    element(by.css('nav .posts')).click();
    var post = 'my new post' + Math.random();
    element(by.model('postBody')).sendKeys(post);
    element(by.css('form .btn')).click();
    element.all(by.css('ul.list-group li')).first().getText().then(function (text) {
      expect(text).to.contain(post);
    })
    // the user should now see their psot as the first post on the page
  })
  afterEach(function () {
    db.connection.db.dropDatabase();
  })
})
