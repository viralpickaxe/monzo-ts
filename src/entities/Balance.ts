import { Currency } from '../lib/Currency';

export interface Balance {
  account_id: string;
  balance: number;
  spend_today: number;
  currency: Currency;
}
