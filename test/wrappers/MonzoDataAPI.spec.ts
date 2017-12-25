import { expect } from 'chai';
import { MonzoDataAPI } from '../../src/wrappers/MonzoDataAPI';

const TEST_ACCESS_TOKEN = '123';

describe('MonzoDataAPI', () => {
  describe('constructor', () => {
    it('should save params to private vars', () => {
      const client = new MonzoDataAPI(TEST_ACCESS_TOKEN);

      expect(client['accessToken']).to.equal(TEST_ACCESS_TOKEN);
    });

    it('should throw an error if no accessToken is provided', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new MonzoDataAPI('');
      }).to.throw(/accessToken/);
    });
  });
});
