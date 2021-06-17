export const emailValidate = (email) =>
{
    const validator = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return validator.test(email);
}

export function firstLetterUppercase(entre)
{
    if (entre.length === 1) return entre.toUpperCase();
    return `${entre.substring(0, 1).toUpperCase()}${entre.substring(1)}`;
}

