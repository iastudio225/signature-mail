import { SignatureData } from './types';

export const INITIAL_SIGNATURE_DATA: SignatureData = {
  name: "EYEMON POUPOUYA",
  role: "Développeur Frontend",
  email: "hello@reallygreatsite.com",
  phoneFixe: "",
  mobile: "123-456-7890",
  website: "www.reallygreatsite.com",
  address: "123 Anywhere St., Any City",
  logoType: 'url',
  logoContent: '/logo/default-logo.png',
  width: 150,
  nameFontSize: 18,
  roleFontSize: 14,
  contactFontSize: 12,
};


const createIconBase64 = (svgPath: string) => `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#005442">${svgPath}</svg>`)}`;

export const SIGNATURE_ICONS = {
    email: createIconBase64('<path d="M1.5 4.5h21V6l-10.5 7.5L1.5 6v-1.5Zm0 3V19.5h21V7.5l-10.5 7.5L1.5 7.5Z"/>'),
    phone: createIconBase64('<path d="m19.23 15.26-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.02 15.02 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.01.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.04.17 2.89 1.05 5.61 2.41 7.98 1.46 2.54 3.55 4.63 6.09 6.09 2.37 1.36 5.09 2.24 7.98 2.41 1.1.07 2.04-.87 2.04-2v-1.73c.01-1.01-.75-1.86-1.76-1.98Z"/>'),
    mobile: createIconBase64('<path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>'),
    website: createIconBase64('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM4 12c0-1.46.42-2.82 1.15-4H6v8h-.85C4.42 14.82 4 13.46 4 12Zm8.5 8c-1.39 0-2.68-.45-3.72-1.22v-2.5c1 .58 2.06.91 3.22.91s2.22-.33 3.22-.91v2.5A6.93 6.93 0 0 1 12.5 20ZM12 11.5c-1.16 0-2.22-.33-3.22-.91V8.41c1 .58 2.06.91 3.22.91s2.22-.33 3.22-.91v2.18c-1 .58-2.06.91-3.22.91Zm6.85-3H18V6.15c.73 1.18 1.15 2.54 1.15 4a8.16 8.16 0 0 1-.3 2H18V8Z"/>'),
    address: createIconBase64('<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"/>'),
};