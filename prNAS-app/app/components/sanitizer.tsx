// https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

const sanitize = (input: string) => {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        ";": '&#59;',
        "(": '&#40;',
        ")": '&#41;',
        "[": '&#91;',
        "]": '&#93;',
        "{": '&#123;',
        "}": '&#123;',
        "$": '&#36;',
        " ": '_',
    };
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match: string) => (map[match as keyof typeof map])).trim();
}

export default sanitize