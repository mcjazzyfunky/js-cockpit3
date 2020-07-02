// external imports
import React, { FormEvent } from "react";
import { component, isNode } from "js-react-utils";
import * as Spec from "js-spec/validators";

import { ChoiceGroup } from "@fluentui/react";

// internal import
import defineStyles from "../tools/defineStyles";
import FieldWrapper from "./FieldWrapper";
import useFormCtrl from "../hooks/useFormCtrl";

// derived import
const { useCallback, useEffect, useState, useRef } = React;

// --- components ----------------------------------------------------

const RadioButtonGroup = component<RadioButtonGroupProps>({
  name: "RadioButtonGroup",

  ...(process.env.NODE_ENV === ("development" as any)
    ? { validate: Spec.lazy(() => validateRadioButtonGroupProps) }
    : null),

  main: RadioButtonGroupView,
});

// --- types ---------------------------------------------------------

type RadioButtonGroupProps = {
  name?: string;
  label?: string;
  value?: string;
  options?: Option[];
  align?: "horizontal" | "vertical";
  required?: boolean;
  disabled?: boolean;
  messageOnError?: string;
};

type Option = {
  value: string;
  text: string;
};

// --- validation ----------------------------------------------------

const validateRadioButtonGroupProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    value: Spec.string,
    options: Spec.lazy(() => Spec.arrayOf(validateOption)),
    align: Spec.oneOf("horizontal", "vertical"),
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string,
  },
});

const validateOption = Spec.exact({
  value: Spec.string,
  text: Spec.string,
});

// --- styles --------------------------------------------------------

const useRadioButtonGroupStyles = defineStyles((theme) => {
  return {
    root: {},

    gapRight: {
      marginRight: "10px",
    },
  };
});

// --- view ----------------------------------------------------------

function RadioButtonGroupView({
  name,
  label,
  options,
  value,
  align = "vertical",
  disabled = false,
  required = false,
  messageOnError,
}: RadioButtonGroupProps) {
  const [val, setVal] = useState(value),
    [error, setError] = useState(""),
    classes = useRadioButtonGroupStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valRef = useRef(val),
    requiredRef = useRef(required),
    messageOnErrorRef = useRef(messageOnError),
    onInput = useCallback(
      (ev: FormEvent<HTMLInputElement>) => {
        setVal(ev.currentTarget.value);

        if (error) {
          setError("");
        }
      },
      [error]
    );

  useEffect(() => {
    nameRef.current = name;
    valRef.current = val;
    requiredRef.current = required;
    messageOnErrorRef.current = messageOnError;
  }, [name, val, required, messageOnError]);

  useEffect(() => {}, [val]);

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(valRef.current, requiredRef.current);

        if (update && errorMsg) {
          setError(errorMsg);
        }

        return !errorMsg
          ? {
              name: nameRef.current || "",
              valid: true,
              value: valRef.current,
            }
          : {
              name: nameRef.current || "",
              valid: false,
            };
      });
    }
  }, [formCtrl]);

  const styles: any =
    align !== "horizontal"
      ? null
      : {
          flexContainer: { display: "flex" },
        };

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <ChoiceGroup
        //     align={align}
        value={value}
        styles={styles}
        options={
          !options
            ? []
            : options.map((option) => ({
                key: option.value,

                text:
                  align === "horizontal"
                    ? ((
                        <div className={classes.gapRight}>{option.text}</div>
                      ) as any)
                    : option.text,
              }))
        }
      />
    </FieldWrapper>
  );
}

// --- misc ----------------------------------------------------------

function validate(
  value: string | undefined,
  required: boolean,
  pattern?: RegExp,
  messageOnError?: string
) {
  let ret: string | null = null;

  if (required && !value) {
    ret = messageOnError ? messageOnError : "This is a required field";
  }

  return ret;
}

// --- exports -------------------------------------------------------

export default RadioButtonGroup;
