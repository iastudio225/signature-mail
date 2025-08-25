import { SignatureData } from './types';

export const INITIAL_SIGNATURE_DATA: SignatureData = {
  name: "TOTO TITI",
  role: "Commercial",
  email: "toto.titi@laposte.ci",
  phoneFixe: "+225 00 01 23 45 67",
  mobile: "+225 01 23 45 67 89",
  website: "www.laposte.ci",
  address: "Abidjan, Treichville, km4,",
  logoType: 'url',
  logoContent: 'https://signature-mail.laposte.ci/images/logo.png',
  width: 150,
  nameFontSize: 18,
  roleFontSize: 14,
  contactFontSize: 12,
};


export const SIGNATURE_ICONS = {
    email: 'https://signature-mail.laposte.ci/images/email.png',
    phone: 'https://signature-mail.laposte.ci/images/phone.png',
    mobile: 'https://signature-mail.laposte.ci/images/mobile.png',
    website: 'https://signature-mail.laposte.ci/images/website.png',
    address: 'https://signature-mail.laposte.ci/images/address.png',
};