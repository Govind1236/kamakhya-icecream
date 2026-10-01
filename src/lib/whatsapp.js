// Builds a wa.me deep link from the CMS contact number.
// Numbers are stored for display (e.g. "+977 9823800422"), so strip everything
// that isn't a digit before handing it to WhatsApp.
export function whatsAppDigits(number) {
  if (typeof number !== "string" && typeof number !== "number") return "";
  return String(number).replace(/\D/g, "");
}

export function buildWhatsAppUrl(number, message = "") {
  const digits = whatsAppDigits(number);
  if (!digits) return null;
  const text = message.trim();
  return text
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digits}`;
}