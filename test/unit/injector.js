import chai from 'chai';

chai.use(require('chai-as-promised'));
const expect = chai.expect;

import { Injector } from '../../src/injector';

describe('Injector', () => {
  describe('should create a pristing injector before any dependencies are added', () => {
    it('should create a pristine injector', () => {
      let injector = new Injector();
      expect(injector.servicePromises).to.have.length(0);
      expect(Object.keys(injector.services)).to.have.length(0);
    });
  });

  describe('add', () => {
    it('should allow a dependency to be added', () => {
      let injector = new Injector({});
      injector.add('blars', function(done) {
        done(null, 'tacoman');
      });

      expect(injector.services).to.have.property('blars');
      expect(injector.services.blars).to.equal('tacoman');
    });
  });

  describe('get', () => {
    it('should allow a dependency to be retrieved', () => {
      let injector = new Injector({});
      injector.add('blars', function(done) {
        done(null, 'tacoman');
      });

      expect(injector.get('blars')).to.equal('tacoman');
    });
  });

  describe('ready', () => {
    it('should allow us to react once the injector is ready', (done) => {
      let injector = new Injector({});
      injector.add('blars', (cb) => {
        setTimeout(() => {
          cb(null, 'tacoman');
        });
      });

      expect(injector.ready()).to.eventually.be.fulfilled;
      injector.ready().then(() => {
        expect(injector.get('blars')).to.equal('tacoman');
        done();
      });
    });
  });
});
