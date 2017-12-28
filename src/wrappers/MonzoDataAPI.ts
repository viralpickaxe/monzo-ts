import axios from 'axios';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
import { Balance } from '../entities/Balance';
import { MonzoAPI } from './MonzoAPI';

export class MonzoDataAPI extends MonzoAPI {
  public constructor(
    private accessToken: string,
  ) {
    super();

    if (accessToken === undefined || accessToken.length === 0) {
      throw new Error('No accessToken provided');
    }
  }

  public async listAccounts(): Promise<Account[]> {
    const response = await axios.get(`${this.baseUrl}/accounts`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });
    return response.data.accounts.map((account: any) => {
      return {
        ...account,
        created: new Date(account.created),
      };
    });
  }

  public async listTransactions(
    accountId: string,
    withMerchant?: boolean,
    since?: string | Date,
    before?: string | Date,
  ): Promise<Transaction[]> {
    const params: any = {};

    if (withMerchant) {
      params['expand[]'] = 'merchant';
    }

    if (since !== undefined) {
      if (typeof since === 'object') {
        params['since'] = (since as Date).toISOString();
      } else {
        params['since'] = since;
      }
    }

    if (before !== undefined) {
      if (typeof before === 'object') {
        params['before'] = (before as Date).toISOString();
      } else {
        params['before'] = before;
      }
    }

    const response = await axios.get(`${this.baseUrl}/transactions`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
      params: {
        ...params,
        account_id: accountId,
      },
    });
    return response.data.transactions.map((transaction: any) => {
      return {
        ...transaction,
        created: new Date(transaction.created),
        settled: new Date(transaction.settled),
        updated: new Date(transaction.updated),
        attachments: transaction.attachments.map((attachment: any) => {
          return {
            ...attachment,
            created: new Date(attachment.created),
          };
        }),
        merchant: transaction.merchant !== null && typeof transaction.merchant !== 'string' ? {
          ...transaction.merchant,
          updated: transaction.merchant.updated,
        } : transaction.merchant,
      };
    });
  }

  public async getBalance(
    accountId: string,
  ): Promise<Balance[]> {
    const response = await axios.get(`${this.baseUrl}/balance`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
      params: {
        account_id: accountId,
      },
    });
    return {
      ...response.data,
      account_id: accountId,
    };
  }
}
