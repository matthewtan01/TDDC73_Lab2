const cardTypes = [
    { type: 'visa', re: '^4' },
    { type: 'amex', re: '^(34|37)' },
    { type: 'mastercard', re: '^5[1-5]' },
    { type: 'discover', re: '^6011' },
    { type: 'troy', re: '^9792' },
  ];

export const getCardType = (cardNumber) => {
    const match = cardTypes.find((cc) => cardNumber.match(new RegExp(cc.re)) != null);
    return match ? match.type : 'visa';
};

