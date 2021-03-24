export const emailValidate = (email) => {
    const validator = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return validator.test(email);
}

