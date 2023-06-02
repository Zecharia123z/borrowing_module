export function getLinkClass(link: string, currentLink: string) {
    const formatted = "/" + link;
    if (formatted === currentLink) {
        return "link active";
    } else {
        return "link"
    }
}

export function getDateString() {
    const d = new Date();
    return d.toString();
}

export function getWeekFromNowDate() {
    var result = new Date();
    result.setDate(result.getDate() + 7);
    return result.toString();
}