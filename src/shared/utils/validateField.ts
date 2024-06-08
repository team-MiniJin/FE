export const validateField = (
  name: string,
  value: string,
  confirmPassword?: string
) => {
  switch (name) {
    case 'name':
      return /^[가-힣a-zA-Z]{2,50}$/.test(value)
        ? ''
        : '2~50자의 한글, 영문만 가능합니다.';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : '올바른 이메일 형식이 아닙니다.';
    case 'username':
      return /^[a-zA-Z0-9]{6,20}$/.test(value)
        ? ''
        : '6~20자의 영문, 숫자만 가능합니다.';
    case 'password':
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        value
      )
        ? ''
        : '8~20자의 영문, 숫자, 특수문자 조합이어야 합니다.';
    case 'confirmPassword':
      return value === confirmPassword ? '' : '비밀번호가 일치하지 않습니다.';
    default:
      return '';
  }
};
