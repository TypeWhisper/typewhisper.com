import { useId } from "react";

interface FilterRowProps<Value extends string> {
  label: string;
  options: { value: Value; label: string }[];
  selected: Value;
  onChange: (value: Value) => void;
}

/** One labelled row of the add-on filters; exactly one chip is pressed. */
export function FilterRow<Value extends string>({
  label,
  options,
  selected,
  onChange,
}: FilterRowProps<Value>) {
  const labelId = useId();
  return (
    <div className="addon-filters__row" role="group" aria-labelledby={labelId}>
      <p id={labelId} className="addon-filters__label">
        {label}
      </p>
      <div className="addon-filters__chips">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="site-chip addon-chip"
            aria-pressed={selected === option.value}
            data-filter-value={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
