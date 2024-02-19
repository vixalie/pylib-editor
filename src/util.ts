import cx, { ClassDictionary } from "clsx";
import { defaultTo, isEmpty, isNil, prop } from "ramda";
import { ChangeHandler } from "react-hook-form";

export function convertFormEvent(
  name: string,
  event: InputEvent,
  property: string = "value",
  defaultValue?: unknown = null
): Parameters<ChangeHandler> {
  return {
    target: {
      name,
      value: defaultTo(defaultValue)(prop(property, event.currentTarget)),
    },
    type: event.type,
  };
}

export function composite(classesDefination: ClassDictionary, ...classes: string[]) {
  /** @type {import("clsx").ClassArray} */
  const classesItems = classes
    .filter((c) => !isNil(c) && !isEmpty(c))
    .map((c) => prop(c, classesDefination) ?? c);
  return cx(...classesItems);
}
