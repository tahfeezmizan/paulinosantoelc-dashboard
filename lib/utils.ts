import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function verifyToken(token: string) {
  return jwtDecode(token);
}

// ? responsible for server api endpoint
export function baseApiInProdOrDev() {
  const BASEAPI =
    process.env.NODE_ENV !== "development"
      ? process.env.NEXT_PUBLIC_BASEURL_PROD
      : process.env.NEXT_PUBLIC_BASEURL_DEV;

  return BASEAPI;
}

// ? responsible for front-end api endpoint
export function baseClientPublicURLInProdOrDev() {
  const BASEAPI =
    process.env.NODE_ENV !== "development"
      ? process.env.NEXT_PUBLIC_URL_PROD
      : process.env.NEXT_PUBLIC_URL;

  return BASEAPI;
}

// ? responsible for socket
export function socketIOBackendBaseApi() {
  const BASEAPI =
    process.env.NODE_ENV !== "development"
      ? process.env.NEXT_PUBLIC_BACKEND_BASEURL_PROD
      : process.env.NEXT_PUBLIC_BACKEND_BASEURL_DEV;

  return BASEAPI;
}