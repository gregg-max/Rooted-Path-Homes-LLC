const MONEY_LABELS = new Set(["Purchase price", "Down payment", "Monthly payment"]);

export function isTbd(value: string) {
  return value.trim().toUpperCase() === "TBD";
}

export function formatFact(label: string, value: string) {
  const trimmed = value.trim();
  if (isTbd(trimmed)) return "TBD";
  if (!MONEY_LABELS.has(label)) return trimmed;
  const cleaned = trimmed.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return trimmed;
  const amount = Number(cleaned);
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}
