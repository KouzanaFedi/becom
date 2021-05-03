export default class CustomErrorMsg
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