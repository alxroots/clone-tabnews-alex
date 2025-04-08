const calculadora = require("../../model/calculadora");

test("Somar 2 + 2deveria  retornar 4", () => {
  const resultado = calculadora.sum(2, 2);
  expect(resultado).toBe(4);
});
