const MONEY_LABELS = new Set(["Purchase price", "Down payment", "Monthly payment"]);

export function isTbd(value: string) {
  return value.trim().toUpperCase() === "TBD";
}

export function formatMoney(value: string) {
  const trimmed = value.trim();
  const cleaned = trimmed.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return trimmed;
  const amount = Number(cleaned);
  const cents = cleaned.includes(".");
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

export function formatFact(label: string, value: string) {
  const trimmed = value.trim();
  if (isTbd(trimmed)) return "TBD";
  if (!MONEY_LABELS.has(label)) return trimmed;
  return formatMoney(trimmed);
}

export function cardMoney(label: string, value: string) {
  if (isTbd(value)) return "TBD";
  if (label === "Down payment") return `${formatMoney(value)} down`;
  if (label === "Monthly payment") return `from ${formatMoney(value)}/mo`;
  return formatFact(label, value);
}
