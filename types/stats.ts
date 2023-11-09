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

export interface AwardRecognitionInputs {
  id?: string;
  type: string;
  text: string;
  user?: string | number;
}

export interface LeaderboardStat {
  quota_verified: boolean;
  year: number | string;
  company: string;
  title: string;
  market: string;
  quota_attainment_percent: string;
  avg_deal_size: string;
  avg_sales_cycle: string;
  leaderboard_rank?: number;
  industry: string;
  user?: string | number;
}
