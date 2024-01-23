// new Stat => refactored from YTD and Career stats to one stat
export interface Stat {
  id?: string;
  quota_verified: boolean;
  year: number;
  // quarter only allows 1-4
  quarter: 1 | 2 | 3 | 4;
  company: string;
  title: string;
  market: string;
  quota: number;
  quota_attainment_percentage: number;
  average_deal_size: number;
  average_sales_cycle: number;
  industry: string;
  user?: string;
  user_data?: any;
}

export interface LeaderboardStat {
  id?: string;
  quota_verified?: boolean;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  company: string;
  title: string;
  market: string;
  quota: number;
  quota_attainment_percentage: string;
  average_deal_size: string;
  average_sales_cycle: string;
  industry: string;
  user: string;
  user_data?: any;
}

export interface Award {
  id?: string;
  type: string;
  text: string;
  user?: string | number;
  user_data?: any;
}

export interface YTDStatInputs {
  id?: string;
  quota_verified?: boolean;
  quarter: string;
  company: string;
  title: string;
  market: string;
  quota_attainment_percentage?: string;
  avg_deal_size?: string;
  avg_sales_cycle?: string;
  average_deal_size?: string;
  average_sales_cycle?: string;
  industry?: string;
  user?: string | number;
}

export interface CareerStatInputs {
  id?: string;
  quota_verified?: boolean;
  year: string;
  company: string;
  title: string;
  market: string;
  quota_attainment_percentage?: string;
  avg_deal_size?: string;
  avg_sales_cycle?: string;
  average_deal_size?: string;
  average_sales_cycle?: string;
  industry?: string;
  user?: string | number;
}
