export const required = (value) => {
  return !value ? 'Pole obowązkowe' : undefined;
};
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Wprowadź poprawny e-mail' : undefined;

export const minLength = (min) => (value) =>
  value && value.length < min ? `Długość hasła musi być nie mniejsza niż ${min}` : undefined;
