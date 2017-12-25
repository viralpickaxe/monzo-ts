import { Currency } from '../lib/Currency';
import { Merchant } from './Merchant';
import { Attachment } from './Attachment';

export interface Transaction {
  id: string;
  created: Date;
  description: string;
  amount: number;
  fees: Object;
  currency: Currency;
  merchant: string | null | Merchant;
  notes: string;
  metadata: Object;
  labels: null;
  account_balance: number;
  attachments: Attachment[];
  category: string;
  is_load: boolean;
  settled: Date;
  local_amount: number;
  local_currency: Currency;
  updated: Date;
  account_id: string;
  counterparty: Object;
  scheme: string;
  dedupe_id: string;
  originator: boolean;
  include_in_spending: boolean;
}
