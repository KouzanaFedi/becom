export function unifySize(size)
{
    let parsed = parseInt(size);
    if (parsed < 1024) return (`${parsed.toFixed(2)} Byte`);
    else {
        parsed = parsed / 1024;
        if (parsed < 1024) return (`${parsed.toFixed(2)} KB`);
        else {
            parsed = parsed / 1024;
            if (parsed < 1024) return (`${parsed.toFixed(2)} MB`);
            else {
                parsed = parsed / 1024;
                return (`${parsed.toFixed(2)} GB`);
            }
        }
    }
}