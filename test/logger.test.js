"use strict";

const test = require('./_base')(module);


test.beforeEach = function*() {
  this.payContract = this.contractFactory.make({
    contract: this.Solidity.PayContract,
  });
};


test['nothing by default'] = function*() {
  let spy = this.mocker.spy(console, 'info');
  
  this.payContract.logger.info('test');
  
  spy.should.not.have.been.called;
};


test['turn on and off'] = function*() {
  let spy = this.mocker.spy();
  
  this.payContract.logger = {
    info: spy,
  };

  this.payContract.logger.info('test');

  spy.should.have.been.calledWithExactly(`test`);
  
  this.payContract.logger = null;

  this.payContract.logger.info('test');
  
  spy.callCount.should.eql(1);
};



test['must be valid logger'] = function*() {
  let spy = this.mocker.spy();
  
  this.payContract.logger = 'blah';
  
  this.payContract.logger.info('test');

  spy.should.not.have.been.called;
};


