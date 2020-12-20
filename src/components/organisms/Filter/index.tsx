import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxPopover,
} from "@reach/combobox";
import styled from "styled-components";

import "@reach/combobox/styles.css";

const Label = styled.span`
  color: var(--color-fg-sub);
`;

const StyledCombobox = styled(Combobox)`
  & [data-reach-combobox-input] {
    border: none;
    border-block-end: 1px solid var(--color-border);
    font-size: 1rem;
    padding: calc(var(--baseline) * 0.25rem) 0.2em;
    width: 100%;

    background-color: var(--color-bg);
    color: var(--color-fg);

    transition: border-color 0.2s ease;

    &:focus {
      border-color: var(--color-primary);
      outline: none;
    }
  }
`;

const StyledPopover = styled(ComboboxPopover)`
  background-color: var(--color-bg-accent);
  color: var(--color-fg);

  & [data-reach-combobox-option][data-highlighted],
  & [data-reach-combobox-option]:hover {
    background-color: var(--color-primary);
    color: white;
  }

  & [data-user-value] {
    text-decoration: underline;
  }
`;

export interface FilterProps {
  className?: string;
  id: string;
  slot?: string;

  label: string;
  placeholder?: string;
  value: string;

  options: readonly string[];

  onChange(option: string): void;
}

export const Filter = ({
  label,
  className,
  slot,
  id,
  placeholder,
  options,
  value,
  onChange,
}: FilterProps) => {
  const labelId = `${id}__label`;

  return (
    <div className={className} slot={slot}>
      <Label id={labelId}>{label}</Label>
      <StyledCombobox
        id={id}
        aria-labelledby={labelId}
        onSelect={(option: string) => onChange(option)}
      >
        <ComboboxInput
          value={value}
          placeholder={placeholder}
          onChange={(ev) => {
            onChange(ev.currentTarget.value);
          }}
        />
        <StyledPopover>
          <ComboboxList>
            {options
              .filter((option) => option.includes(value))
              .slice(0, 10)
              .map((option, i) => (
                <ComboboxOption key={i} value={option}>
                  <ComboboxOptionText />
                </ComboboxOption>
              ))}
          </ComboboxList>
        </StyledPopover>
      </StyledCombobox>
    </div>
  );
};
