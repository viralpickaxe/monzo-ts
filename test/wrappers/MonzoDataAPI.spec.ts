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

// tslint:disable
(async () => {
  let client = new MonzoDataAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5NFB2SU5ER3pUM2s2dHo4anAiLCJleHAiOjE1MTQxNzkyMzcsImlhdCI6MTUxNDE1NzYzNywianRpIjoidG9rXzAwMDA5UnRwNFc2N1NHQXJ1cVUzNWwiLCJ1aSI6InVzZXJfMDAwMDk0UmpaaDRCY1BkWnZVM0NPUCIsInYiOiIyIn0.xXiGPNmuour3UYrZcDgCxwT2doU4TEQkFnUuJ2p49Zk');
  const accounts = await client.listTransactions('acc_000094RjZhAvDNmOrqzN7x', true);
  console.log(accounts);
})()
