const formatNumber = (
  amount: number,
  intlNumberFormatOptions?: Intl.NumberFormatOptions
): string => {
  const intlNumberFormat = new Intl.NumberFormat(
    'en-US',
    intlNumberFormatOptions
  );
  return intlNumberFormat.format(amount);
};

export default formatNumber;
