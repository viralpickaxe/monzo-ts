export enum AccountType {
  Prepaid = 'uk_prepaid',
  Debit = 'uk_retail',
}

export interface Account {
  id: string;
  created: Date;
  description: string;
  type: AccountType;
}
