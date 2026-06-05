export type TransactionCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Rent'
  | 'Entertainment'
  | 'Health'
  | 'Education'
  | 'Others';

export interface TransactionItem {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  notes?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetItem {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  type: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface ReportItem {
  id: string;
  user_id: string;
  report_type: string;
  period: string;
  generated_at: string;
  metadata?: Record<string, unknown>;
  download_url?: string;
}
