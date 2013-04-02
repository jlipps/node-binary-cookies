/*global describe:true, it:true, beforeEach:true */
"use strict";

var binaryCookies = require('../cookies')
  , should = require('should')
  , path = require('path')
  , BAD_COOKIES = path.resolve(__dirname, 'NotCookies.binarycookies')
  , APPLE_COOKIES = path.resolve(__dirname, 'AppleStore.binarycookies');

describe('parser', function() {
  var cookies = null;

  beforeEach(function() {
    cookies = binaryCookies();
  });

  it('should not be able to open non-existent file', function(done) {
    cookies.cookiePath = "/does/not/exist.binarycookies";
    cookies._open(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should not be able to open non-binary-cookie file', function(done) {
    cookies.cookiePath = BAD_COOKIES;
    cookies._open(function(err) {
      should.exist(err);
      done();
    });
  });


  it('should be able to get header from binary-cookie file', function(done) {
    cookies.cookiePath = APPLE_COOKIES;
    cookies._open(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should get number of pages', function(done) {
    cookies.cookiePath = APPLE_COOKIES;
    cookies._open(function(err) {
      should.not.exist(err);
      var numPages = cookies._getNumPages();
      numPages.should.equal(2);
      done();
    });
  });

  it('should get page sizes', function(done) {
    cookies.cookiePath = APPLE_COOKIES;
    cookies._open(function(err) {
      should.not.exist(err);
      cookies._getNumPages();
      var sizes = cookies._getPageSizes();
      sizes[0].should.equal(730);
      sizes[1].should.equal(299);
      done();
    });
  });


});
