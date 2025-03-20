export const isValidUrl = (url, domain) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.endsWith(domain);
    } catch (e) {
        return false;
    }
};