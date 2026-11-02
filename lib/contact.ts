const EMAIL_USER = "ferdiansyahmuh5";
const EMAIL_DOMAIN = ["gmail", "com"];
const WHATSAPP_COUNTRY = "62";
const WHATSAPP_NUMBER = "85779659563";

export function getEmailAddress() {
  return `${EMAIL_USER}@${EMAIL_DOMAIN.join(".")}`;
}

export function buildMailto(subject = "Portfolio inquiry") {
  return `mailto:${getEmailAddress()}?subject=${encodeURIComponent(subject)}`;
}

export function buildWhatsApp(message = "Hi Muhar, I found your portfolio.") {
  return `https://wa.me/${WHATSAPP_COUNTRY}${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}
