export const useSanitize = () => {
    const sanitize = <T extends Record<string, any>>(obj: T): Partial<T> => {
        return useMapValues(obj, (value) => {
            if (isPlainObject(value)) {
                return sanitize(value);
            }
            return value;
        }) as Partial<T>;
    };

    const sanitizedObject = (obj: any) => useOmitBy(obj, (value, key) => key.startsWith('_'));

    return { sanitize: (obj: any) => sanitizedObject(sanitize(obj)) };
};