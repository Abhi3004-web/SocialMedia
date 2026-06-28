export const getFullName = (
    firstName: string,
    lastName: string
): string => {
    return `${firstName} ${lastName}`;
};

export const truncateText = (
    text: string,
    maxLength: number
): string => {
    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + "...";
};

export const formatFollowers = (
    count: number
): string => {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }

    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }

    return count.toString();
};