import { composite, convertFormEvent } from "@/util";
import { IconCheck, IconX } from "@tabler/icons-react";
import { defaultTo, isNil, mergeAll, omit, trim } from "ramda";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ChangeHandler } from "react-hook-form";
import classes from "./Input.module.css";

interface InputProps extends Omit<"size", React.InputHTMLAttributes> {
  className?: React.HTMLAttributes["className"];
  inputClassName?: React.HTMLAttributes["className"];
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  variant?: "fill" | "outline" | "underline" | "transparent";
  color?: "primary" | "secondary" | "danger" | "warn" | "success" | "info";
}

export const Input = forwardRef(function (
  {
    className,
    inputClassName,
    leftSection,
    valueControlSection,
    rightSection,
    size,
    variant,
    color,
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={composite(
        classes,
        "input-container",
        `color-${color ?? "secondary"}`,
        `variant-${variant ?? "outline"}`,
        className ?? ""
      )}
    >
      {!isNil(leftSection) && (
        <div className={composite(classes, "left-section-container")}>{leftSection}</div>
      )}
      <input
        className={composite(classes, "input", `size-${size ?? "m"}`, inputClassName ?? "")}
        ref={ref}
        {...rest}
      />
      {!isNil(rightSection) && (
        <div className={composite(classes, "right-section-container")}>{rightSection}</div>
      )}
    </div>
  );
});

export const TextInput = forwardRef(function (
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return <Input {...omit(["type"], props)} ref={ref} type="text" />;
});

export const NumberInput = forwardRef(function (
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return <Input {...omit(["type"], props)} ref={ref} type="number" />;
});

/**
 * @typedef {Object} TextAreaProps
 * @property {ClassName} [className]
 * @property {ClassName} [inputClassName]
 * @property {string} [name]
 * @property {any} [value]
 * @property {import("react-hook-form").ChangeHandler} [onChange]
 * @property {number} [minHeight]
 * @property {number} [minWidth]
 * @property {number} [maxWidth]
 * @property {"xs" | "s" | "m" | "l" | "xl" | "xxl"} [size]
 * @property {"fill" | "outline" | "underline" | "transparent"} [variant]
 * @property {"primary" | "secondary" | "danger" | "warn" | "success" | "info"} [color]
 */

interface TextAreaProps {
  className?: React.HTMLAttributes["className"];
  inputClassName?: React.HTMLAttributes["className"];
  name?: React.InputHTMLAttributes["name"];
  value?: React.InputHTMLAttributes["value"];
  onChange?: ChangeHandler;
  minHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  variant?: "fill" | "outline" | "underline" | "transparent";
  color?: "primary" | "secondary" | "danger" | "warn" | "success" | "info";
}

export const TextArea = forwardRef(function (
  {
    className,
    inputClassName,
    size,
    variant,
    color,
    value,
    onChange,
    name,
    minHeight,
    minWidth,
    maxWidth,
    ...rest
  }: TextAreaProps,
  ref: ReactForwardedRef<HTMLDivElement>
) {
  const [compositionLock, setCompositionLock] = useState(false);
  const handleContentChange = (e) => {
    if (!compositionLock) {
      onChange?.(convertFormEvent(name, e, "innerText", ""));
    }
  };
  const handleCompositionEnd = (e) => {
    setCompositionLock(false);
    handleContentChange(e);
  };

  return (
    <div
      className={composite(
        classes,
        "input-container",
        `color-${color ?? "secondary"}`,
        `variant-${variant ?? "outline"}`,
        className ?? ""
      )}
    >
      <div
        contentEditable
        className={composite(classes, "textarea", `size-${size ?? "m"}`, inputClassName ?? "")}
        onInput={handleContentChange}
        onCompositionStart={() => setCompositionLock(true)}
        onCompositionEnd={handleCompositionEnd}
        style={mergeAll([
          maxWidth && { maxWidth: `${maxWidth}em` },
          minWidth && { minWidth: `${minWidth}em` },
          minHeight && { minHeight: `${minHeight}em` },
        ])}
        ref={ref}
        suppressContentEditableWarning={true}
        {...rest}
      >
        {value}
      </div>
    </div>
  );
});

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: React.HTMLAttributes["className"];
  required?: boolean;
  minWidth?: number;
}

export const Label = forwardRef(function (
  { className, required, minWidth, children, ...rest }: React.PropsWithChildren<LabelProps>,
  ref: React.ForwardedRef<HTMLLabelElement>
) {
  return (
    <label
      className={composite(classes, "label", required && "required", className ?? "")}
      ref={ref}
      style={minWidth && { minWidth: minWidth }}
      {...rest}
    >
      {children}
    </label>
  );
});

function getCaret(el: HTMLElement) {
  let caretAt = 0;
  const sel = window.getSelection();

  if (sel.rangeCount == 0) {
    return caretAt;
  }

  const range = sel.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);
  caretAt = preRange.toString().length;

  return caretAt;
}

function setCaret(el: HTMLElement, offset: number) {
  let sel = window.getSelection();
  let range = document.createRange();
  if (el.childNodes.length > 0) {
    range.setStart(el.childNodes[0], offset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

/**
 * @template T
 * @typedef {Object} InlineEditProps<T>
 * @property {ClassName} [className]
 * @property {T} [value]
 * @property {boolean} [disabled=false]
 * @property {(value: T) => void | Promise<void>} [onInput]
 * @property {(value: T) => void | Promise<void>} [onConfirm]
 * @property {() => void | Promise<void>} [onCancel]
 */

interface InlineEditProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  className?: React.HTMLAttributes["className"];
  value?: T;
  disabled?: boolean;
  onInput?: (value: T) => void | Promise<void>;
  onConfirm?: (value: T) => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

export const InlineEdit = forwardRef(function <T>(
  { value, disabled, onInput, onCancel, onConfirm }: InlineEditProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const contentRef = useRef();
  const caretPos = useRef();
  const lastValue = useRef(value);
  const [internalValue, setInternalValue] = useState(value);
  const [isEditing, setEditing] = useState(false);
  const [compositionLock, setCompositionLock] = useState(false);

  function processInput(
    e: React.FormEvent<HTMLDivElement> | React.CompositionEvent<HTMLDivElement>
  ) {
    caretPos.current = getCaret((ref ?? contentRef).current);
    setInternalValue(trim(e.target.innerText));
    onInput?.(trim(e.target.innerText));
  }

  const handleActivateClick = (e) => {
    if (!(disabled ?? false) && (ref ?? contentRef).current !== document.activeElement) {
      setEditing(true);
      (ref ?? contentRef).current.focus();
    }
  };
  const handleInput = useCallback(
    (e) => {
      if (!compositionLock) {
        processInput(e);
      }
    },
    [compositionLock]
  );
  const handleConfirm = useCallback(() => {
    setEditing(false);
    (ref ?? contentRef).current.blur();
    onConfirm?.(internalValue);
  }, [internalValue]);
  const handleCancel = useCallback(() => {
    setEditing(false);
    setInternalValue(lastValue.current);
    (ref ?? contentRef).current.blur();
    onCancel?.();
  }, [lastValue.current]);
  const handleCompositionEnd = (e) => {
    setCompositionLock(false);
    processInput(e);
  };

  useEffect(() => {
    if (!disabled && isEditing) {
      const caretPosition = defaultTo(internalValue.length, caretPos.current);
      setCaret((ref ?? contentRef).current, caretPosition);
      (ref ?? contentRef).current.focus();
    }
  }, [internalValue, isEditing, disabled]);
  useEffect(() => {
    lastValue.current = value;
    setInternalValue(value);
  }, [value]);

  return (
    <div className={composite(classes, "inline-edit")}>
      <div
        contentEditable={!(disabled ?? false) && isEditing}
        onClick={handleActivateClick}
        onInput={handleInput}
        onCompositionStart={() => setCompositionLock(true)}
        onCompositionEnd={handleCompositionEnd}
        ref={ref ?? contentRef}
        dangerouslySetInnerHTML={{ __html: internalValue }}
      ></div>
      {isEditing && (
        <button onClick={handleConfirm} className={composite(classes, "action")}>
          <IconCheck stroke={1.5} className={composite(classes, "check")} />
        </button>
      )}
      {isEditing && (
        <button onClick={handleCancel} className={composite(classes, "action")}>
          <IconX stroke={1.5} className={composite(classes, "cancel")} />
        </button>
      )}
    </div>
  );
});
