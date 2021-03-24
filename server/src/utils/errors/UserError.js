class CustomErrorMsg
{
    constructor(msg, code)
    {
        this.msg = msg;
        this.code = code;
    }

    toString()
    {
        return `${this.code} : ${this.msg}`
    }
}

export const INVALIDE_EMAIL_ERROR = new CustomErrorMsg('Format email invalide.', 4001);
export const USER_EXISTS_ERROR = new CustomErrorMsg('User exists', 4002);
export const USER_NOT_EXISTS_ERROR = new CustomErrorMsg('User doesn\'t exists', 4003);
export const PASSWORD_INVALIDE_ERROR = new CustomErrorMsg('Password invalide', 4004);
export const RECUP_CODE_INVALIDE_ERROR = new CustomErrorMsg('Code invalide', 4005);
export const RECUP_CODE_EXPIRED_ERROR = new CustomErrorMsg('Code expired', 4006);

