export type CustomInputType = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;
export type CustomSelectType = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
>;

export const productDetailsContainerClasses =
  "mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm";
export const inputSimilaryClassess =
  "p-2 rounded-lg shadow-sm capitalize bg-transparent border border-primary";
export const inputClasses = `${inputSimilaryClassess}`;
export const selectClasses = `${inputSimilaryClassess}`;
