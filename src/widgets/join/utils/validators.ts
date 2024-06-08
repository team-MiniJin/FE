export const validateName = (name: string): boolean =>
  /^[가-힣a-zA-Z]{2,50}$/.test(name);
export const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailParts: string[] = email.split('@');

  if (emailParts.length !== 2) return false;

  const [localPart, domainPart] = emailParts;
  if (
    localPart.length < 1 ||
    localPart.length > 64 ||
    domainPart.length < 3 ||
    domainPart.length > 255
  ) {
    return false;
  }

  return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean =>
  /^[a-zA-Z0-9]{6,20}$/.test(username);

export const validatePassword = (password: string): boolean =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/.test(password);
