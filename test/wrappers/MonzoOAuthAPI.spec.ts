import { expect } from 'chai';
import { MonzoOAuthAPI } from '../../src/wrappers/MonzoOAuthAPI';

const TEST_CLIENT_ID = '123';
const TEST_CLIENT_SECRET = '123';
const TEST_REDIRECT_URL = 'http://example.com';
const TEST_STATE = '12345';

describe('MonzoOAuthAPI', () => {
  describe('constructor', () => {
    it('should save params to private vars', () => {
      const client = new MonzoOAuthAPI(TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_REDIRECT_URL);

      expect(client['clientId']).to.equal(TEST_CLIENT_ID);
      expect(client['clientSecret']).to.equal(TEST_CLIENT_SECRET);
      expect(client['redirectUrl']).to.equal(TEST_REDIRECT_URL);
    });

    it('should throw an error if no clientId is provided', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new MonzoOAuthAPI('', TEST_CLIENT_SECRET, TEST_REDIRECT_URL);
      }).to.throw(/clientId/);
    });

    it('should throw an error if no clientSecret is provided', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new MonzoOAuthAPI(TEST_CLIENT_ID, '', TEST_REDIRECT_URL);
      }).to.throw(/clientSecret/);
    });

    it('should throw an error if no redirectUrl is provided', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new MonzoOAuthAPI(TEST_CLIENT_ID, TEST_CLIENT_SECRET, '');
      }).to.throw(/redirectUrl/);
    });
  });

  describe('generateAuthUrl', () => {
    let client: MonzoOAuthAPI;

    beforeEach(() => {
      client = new MonzoOAuthAPI(TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_REDIRECT_URL);
    });

    it('should genrate an auth url with correct params (and no state)', () => {
      const expectedUrl = `https://auth.monzo.com/?` +
      `client_id=${TEST_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(TEST_REDIRECT_URL)}&` +
      `response_type=code&` +
      `state=`;

      expect(client.generateAuthUrl()).to.equal(expectedUrl);
    });

    it('should genrate an auth url with correct params (state)', () => {
      const expectedUrl = `https://auth.monzo.com/?` +
      `client_id=${TEST_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(TEST_REDIRECT_URL)}&` +
      `response_type=code&` +
      `state=${TEST_STATE}`;

      expect(client.generateAuthUrl(TEST_STATE)).to.equal(expectedUrl);
    });
  });
});
