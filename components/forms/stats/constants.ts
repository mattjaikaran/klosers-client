export const quarterChoices = [
  { value: 1, label: 'Q1' },
  { value: 2, label: 'Q2' },
  { value: 3, label: 'Q3' },
  { value: 4, label: 'Q4' },
];

const CONSUMER_DIRECT = 'Consumer';
const SMALL_BUSINESS = 'Small Business';
const MID_MARKET = 'Mid Market';
const ENTERPRISE = 'Enterprise';
const BUSINESS_DEVELOPMENT = 'Business Development';

export const marketChoices = [
  { value: CONSUMER_DIRECT, label: 'Consumer Direct Sales' },
  { value: SMALL_BUSINESS, label: 'SMB (Small Business) Sales' },
  { value: MID_MARKET, label: 'Mid-Market Sales' },
  { value: ENTERPRISE, label: 'Enterprise Sales' },
  { value: BUSINESS_DEVELOPMENT, label: 'Business Development' },
];

export const dealSizeChoices = [
  { value: '5k - 10k', label: '5k - 10k' },
  { value: '10k - 20k', label: '10k - 20k' },
  { value: '20k - 30k', label: '20k - 30k' },
  { value: '30k - 40k', label: '30k - 40k' },
  { value: '40k - 50k', label: '40k - 50k' },
  { value: '50k - 60k', label: '50k - 60k' },
  { value: '60k - 70k', label: '60k - 70k' },
  { value: '70k - 80k', label: '70k - 80k' },
  { value: '80k - 90k', label: '80k - 90k' },
  { value: '90k - 100k', label: '90k - 100k' },
  { value: '> 100k', label: '> 100k' },
];

export const salesCycleChoices = [
  { value: '<30', label: '< 30 Days' },
  { value: '30', label: '30 Days' },
  { value: '45', label: '45 Days' },
  { value: '60', label: '60 Days' },
  { value: '90', label: '90 Days' },
  { value: '120', label: '120 Days' },
  { value: '>120', label: '> 120 Days' },
];

export const jobTitleChoices = [
  {
    value: 'Chief Revenue Officer (CRO)',
    label: 'Chief Revenue Officer (CRO)',
  },
  {
    value: 'Chief Marketing Officer (CMO)',
    label: 'Chief Marketing Officer (CMO)',
  },
  { value: 'VP of Sales', label: 'VP of Sales' },
  { value: 'Head of Sales', label: 'Head of Sales' },
  { value: 'Account Executive', label: 'Account Executive' },
  { value: 'Sr. Account Executive', label: 'Sr. Account Executive' },
  {
    value: 'Strategic Account Executive',
    label: 'Strategic Account Executive',
  },
  {
    value: 'Mid Market Account Executive',
    label: 'Mid Market Account Executive',
  },
  {
    value: 'Enterprise Account Executive',
    label: 'Enterprise Account Executive',
  },
  { value: 'Director of Marketing', label: 'Director of Marketing' },
  { value: 'Sr. Director of Marketing', label: 'Sr. Director of Marketing' },
  { value: 'Product Marketing Manager', label: 'Product Marketing Manager' },
  { value: 'Market Research Analyst', label: 'Market Research Analyst' },
  { value: 'Sales Manager', label: 'Sales Manager' },
  {
    value: 'Sales Development Representative',
    label: 'Sales Development Representative',
  },
  {
    value: 'Business Development Representative',
    label: 'Business Development Representative',
  },
  {
    value: 'Business Development Manager',
    label: 'Business Development Manager',
  },
  { value: 'Brand Manager', label: 'Brand Manager' },
  { value: 'Marketing Coordinator', label: 'Marketing Coordinator' },
  { value: 'Content Strategist', label: 'Content Strategist' },
  { value: 'Customer Success Manager', label: 'Customer Success Manager' },
  {
    value: 'Sr. Customer Success Manager',
    label: 'Sr. Customer Success Manager',
  },
  { value: 'Market Strategist', label: 'Market Strategist' },
  { value: 'Channel Sales Manager', label: 'Channel Sales Manager' },
  { value: 'Partner Manager', label: 'Partner Manager' },
  {
    value: 'Sales Enablement Specialist',
    label: 'Sales Enablement Specialist',
  },
  {
    value: 'Customer Experience Manager',
    label: 'Customer Experience Manager',
  },
  { value: 'Data Analyst', label: 'Data Analyst' },
  { value: 'User Acquisition Manager', label: 'User Acquisition Manager' },
  {
    value: 'Demand Generation Specialist',
    label: 'Demand Generation Specialist',
  },
];

export const industryChoices = [
  { value: 'IT', label: 'Information Technology (IT) Services' },
  { value: 'CYBERSECURITY', label: 'Cybersecurity' },
  { value: 'SAAS', label: 'Software as a Service (SaaS)' },
  {
    value: 'AI_ML',
    label: 'Artificial Intelligence (AI) and Machine Learning (ML)',
  },
  { value: 'HARDWARE', label: 'Hardware' },
  { value: 'TELECOMMUNICATIONS', label: 'Telecommunications' },
  { value: 'E_COMMERCE', label: 'E-commerce Platforms' },
  { value: 'EDTECH', label: 'EdTech' },
  { value: 'FINTECH', label: 'FinTech' },
  { value: 'HEALTHTECH', label: 'HealthTech/MedTech' },
  { value: 'ERP', label: 'Enterprise Resource Planning (ERP) Systems' },
  { value: 'SOCIAL_MEDIA', label: 'Social Media Platforms' },
  { value: 'BIG_DATA', label: 'Big Data and Analytics' },
  { value: 'IOT', label: 'Internet of Things (IoT)' },
  { value: 'AR_VR', label: 'Augmented Reality (AR)/Virtual Reality (VR)' },
  { value: 'BLOCKCHAIN', label: 'Blockchain and Cryptocurrency' },
  { value: 'CLEANTECH', label: 'CleanTech' },
  { value: 'CLOUD_SERVICES', label: 'Cloud Services' },
  { value: 'GAMING', label: 'Gaming' },
  { value: '5G', label: '5G Technology' },
  { value: 'ADTECH', label: 'AdTech' },
  { value: 'PHARMACEUTICAL', label: 'Pharmaceutical' },
  { value: 'MEDICAL_DEVICES', label: 'Medical Devices' },
  { value: 'AUTOMOTIVE', label: 'Automotive' },
  { value: 'REAL_ESTATE', label: 'Real Estate' },
  { value: 'RETAIL', label: 'Retail' },
  { value: 'WHOLESALE_TRADE', label: 'Wholesale Trade' },
  { value: 'INSURANCE', label: 'Insurance' },
  { value: 'FINANCIAL_SERVICES', label: 'Financial Services' },
  { value: 'CPG', label: 'Consumer Packaged Goods (CPG)' },
  { value: 'FOOD_BEVERAGE', label: 'Food and Beverage' },
  { value: 'HOSPITALITY', label: 'Hospitality' },
  { value: 'TRAVEL_TOURISM', label: 'Travel and Tourism' },
  { value: 'SPORTS_ENTERTAINMENT', label: 'Sports and Entertainment' },
  { value: 'PUBLISHING_MEDIA', label: 'Publishing and Media' },
  { value: 'ADVERTISING_MARKETING', label: 'Advertising and Marketing' },
  { value: 'APPAREL_FASHION', label: 'Apparel and Fashion' },
  { value: 'FURNITURE_DECOR', label: 'Furniture and Home Decor' },
  { value: 'CONSTRUCTION', label: 'Construction and Building Materials' },
  { value: 'INDUSTRIAL_MANUFACTURING', label: 'Industrial and Manufacturing' },
  { value: 'ENERGY_UTILITIES', label: 'Energy and Utilities' },
  { value: 'AEROSPACE_DEFENSE', label: 'Aerospace and Defense' },
  { value: 'AGRICULTURE', label: 'Agriculture' },
  { value: 'TRANSPORTATION_LOGISTICS', label: 'Transportation and Logistics' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'FITNESS_WELLNESS', label: 'Fitness and Wellness' },
  { value: 'PROFESSIONAL_SERVICES', label: 'Professional Services' },
  { value: 'NONPROFIT', label: 'Nonprofit Sector' },
  { value: 'COSMETICS_PERSONAL_CARE', label: 'Cosmetics and Personal Care' },
  { value: 'LUXURY_GOODS_JEWELRY', label: 'Luxury Goods and Jewelry' },
  { value: 'PET_PRODUCTS_SERVICES', label: 'Pet Products and Services' },
  { value: 'ENVIRONMENTAL_SERVICES', label: 'Environmental Services' },
  { value: 'WINE_SPIRITS', label: 'Wine and Spirits' },
];
