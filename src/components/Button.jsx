import React from "react";
import classnames from "classnames";

export default function Button({
  children,
  primary,
  secondary,
  danger,
  rounded,
  outline,
  ...rest
}) {
  const classes = classnames(
    rest.className,
    "flex items-center justify-center px-3 py-1.5 border-none shadow-md",

    {
      "bg-indigo-500 border-indigo-500": primary,
      "bg-slate-500 border-slate-500": secondary,
      "bg-red-500 border-red-500": danger,
      "rounded-full": rounded,

      "text-white": !outline && (primary || secondary || danger),
      "bg-white": outline,
      "text-indigo-900": outline && primary,
      "text-slate-900": outline && secondary,
      "text-red-900": outline && danger,
    }
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariants: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      throw new Error(
        "Only one of primary, secondary, success, warning, and danger is allowed"
      );
    }
  },
};
