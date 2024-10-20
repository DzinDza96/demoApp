Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  const updateOption = { delay: 0, ...options };
  return originalFn(element, text, updateOption);
});
