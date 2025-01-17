import { useEffect, useState } from "react";

export type UseInputControlsProps<T> = {
  /**
   * The value provided to the input, to be used if provided.
   */
  value?: T;

  /**
   * The default value to be used if no value is provided. This is necessary to
   * avoid warnings about a component changing from uncontrolled to controlled.
   */
  defaultValue: T;

  /**
   * Whether the input is disabled; values will not be changed when disabled.
   */
  disabled?: boolean;

  /**
   * Application developer facing callback fired when input value is changed.
   */
  onChange?: (newValue: T) => unknown;
};

/**
 * Hook to manage input controls for our various input elements. Enables an input
 * to be either controlled or uncontrolled. Input components can forward their
 * props to this hook, and it does the internal value state management.
 */
export function useInputControls<T>(props: UseInputControlsProps<T>) {
  const { value, defaultValue, disabled, onChange } = props;

  // Maintain our internal state for the input's value
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);

  // Update our internal value when the provided value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (newValue: T) => {
    if (disabled) {
      return;
    }

    // Update our internal state if consumer did not provide value prop
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return {
    internalValue,
    handleChange,
  };
}
