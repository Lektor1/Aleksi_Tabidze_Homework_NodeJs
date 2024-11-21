process.on("message", (number) => {
  const factorial = (n) => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

  const result = factorial(number);
  process.send(result);
  process.exit();
});
