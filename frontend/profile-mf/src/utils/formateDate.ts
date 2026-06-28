export const formatDate = (
    dateString: string
): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );
};

export const timeAgo = (
    dateString: string
): string => {
    const date = new Date(dateString);

    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    const intervals = [
        { label: "year", value: 31536000 },
        { label: "month", value: 2592000 },
        { label: "day", value: 86400 },
        { label: "hour", value: 3600 },
        { label: "minute", value: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(
            seconds / interval.value
        );

        if (count > 0) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""
                } ago`;
        }
    }

    return "Just now";
};