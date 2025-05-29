export type CompanyInfo = {
  id: string;
  userId: string;
  countryName: string;
  countryCode: string | null;
  companyName: string;
  companyEstablish: string; // e.g., "2017"
  numberOfEmployees: number;
  companyWebsite: string;
  businessIdentification: number;
  logo: string | null;
  tradeLicense: string | null;
  businessType: string[]; // ["exporter", "tradingCompany"]
  businessCategory: string;
  subCategory: string;
  about: string;
  field: string;
  mainProducts: string;
  controlPolicy: boolean;
  companyAddress: string;
  zipCode: string;
  district: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  createdAt: string;
  updatedAt: string;
};
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  emailVerified: boolean;
  role: "BUYER" | "SUPPLIER" | string;
  password: string;
  otp: string | null;
  otpExpiry: string | null;
  stripeCustomerId: string;
  tokenExpiry: string;
  createdAt: string;
  updatedAt: string;
  userStatus: "ACTIVE" | "INACTIVE" | string;
  verifiedAccount: "PENDING" | "VERIFIED" | string;
  isDeleted: boolean;
  isOnline: boolean;
  companyInfo?: CompanyInfo;
};

export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GetUsersResponse {
  metaData: MetaData;
  users: User[];
}

export interface I_Error {
  path: string;
  message: string;
}

export interface I_ErrorResponse {
  data: {
    success: false;
    message: string;
    error: I_Error | I_Error[];
  };
}

export interface P_Data {
  id: string;
  name: string;
  email: string;
}

export interface CompanyDataType {
  name: string;
  phoneNumber: string;
  businessIdentification?: string;
  companyEstablish?: string;
  companyName?: string;
  companyWebsite?: string;
  countryName?: string;
  numberOfEmployees?: string | number;
  businessCategory: string;
  businessType: any;
  subCategory: string;
  about: string;
  mainProducts: string;
  companyAddress: string;
  zipCode: string;
  district: string;
  fullName: string;
  isVerified: boolean;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  tradeLicense: string;
  logo: string;
  controlPolicy: boolean;
}

export type SubscriptionType = {
  id: string;
  userId: string;
  paymentIntentsId: string;
  planId: string;
  isSubscribe: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  plan: {
    id: string;
    planName: string;
    price: number;
    duration: string; 
  };
};


export type OverviewDataType = {
  label: string;
  Buyer: number;
  Supplier: number;
};

export type Category = {
  id: string;
  name: string;
  parentId: string | null;
  children: any[]; // or remove if not needed
  createdAt: string;
  updatedAt: string;
};
