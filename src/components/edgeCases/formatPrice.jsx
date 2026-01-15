import React from "react";

function formatPrice(price, currency = "USD") {
  const num = Number(price);
  if (!Number.isFinite(num)) return "—";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `$${num.toFixed(2)}`;
  }
}

export default formatPrice;
