import { t, type Locale } from "@/i18n/index";
import { formatPrice } from "./format";

interface PriceProps {
  locale: Locale;
  amount: number;
  /** Sets "from" in front of the amount: the listed price is the minimum. */
  from?: boolean;
  /** Period behind the amount, such as "/mo" or "one-time". */
  suffix?: string;
  className?: string;
}

/** One amount as display type, the same form for every tier of the page. */
export function Price({
  locale,
  amount,
  from = false,
  suffix,
  className = "",
}: PriceProps) {
  return (
    <p className={`site-tiers__price commercial-price ${className}`}>
      {from && (
        <span className="commercial-price__from">
          {t(locale, "pricing.tiers.from")}
        </span>
      )}
      {formatPrice(locale, amount)}
      {suffix && <small>{suffix}</small>}
    </p>
  );
}
