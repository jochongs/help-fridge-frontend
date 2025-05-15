export const cn = (...classes: (boolean | string)[]) =>
  classes.filter(Boolean).join(" ");
