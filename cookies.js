"use strict";

var fs = require('fs')
  , _ = require('underscore');

var Cookies = function() {
  this._init();
};

Cookies.prototype.parse = function(cookiePath, cb) {
  this._init();
  this.cookiePath = cookiePath;
  this._open(function(err) {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

Cookies.prototype._init = function() {
  this.cookiePath = null;
  this.curBufPos = 0;
  this.data = null;
  this.numPages = 0;
  this.pages = [];
  this.pageSizes = [];
};

Cookies.prototype._open = function(cb) {
  fs.readFile(this.cookiePath, _.bind(function(err, data) {
    if (err) return cb(err);
    this.data = data;
    var header = this._readSlice(4).toString();
    if (header === "cook") {
      cb();
    } else {
      cb(new Error("This file did not appear to be in the valid format for " +
                   "binary cookies (missed 'cook' header)"));
    }
  }, this));
};

Cookies.prototype._readSlice = function(len) {
  var sliceBuf = this.data.slice(this.curBufPos, len);
  this.curBufPos += len;
  return sliceBuf;
};

Cookies.prototype._readIntBE = function() {
  //console.log("Reading 4 bytes from " + this.curBufPos);
  var ret = this.data.readUInt32BE(this.curBufPos);
  this.curBufPos += 4;
  return ret;
};

Cookies.prototype._getNumPages = function() {
  this.numPages = this._readIntBE();
  return this.numPages;
};

Cookies.prototype._getPageSizes = function() {
  for (var i = 0; i < this.numPages; i++) {
    this.pageSizes.push(this._readIntBE());
  }
  return this.pageSizes;
};

Cookies.prototype._getPages = function() {
  _.each(this.pageSizes, _.bind(function(pageSize, pageIndex) {
  }, this));
};

Cookies.prototype._getNumCookies = function(page) {
};

Cookies.prototype._getCookieOffsets = function(numCookies, page) {
};

Cookies.prototype._getCookieSize = function(cookie) {
};

Cookies.prototype._getBasicCookieData = function(cookie) {
};

Cookies.prototype._getCookieData = function(cookie) {
};

module.exports = function() {
  return new Cookies();
};
