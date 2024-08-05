// FetchData to comminucate with the back-end
export const fetchData = async (url: string, token: string | null, logout: () => void) => {

    const response = await fetch(url, {
        headers: {
            'authorization': `${token}`,
            'content-type': 'application/json'
        }
    });

    if (response.status === 401 || response.status === 403) {
        logout();
        return;
    }
    const json = await response.json();

    return json;
};

// PostData to comminucate with the back-end
export const postData = async (url: string, data: any, token: string | null, logout: () => void) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const json = await response.json();

    if (response.status === 401 || response.status === 403) {
        logout();
        return;
    }

    return json;
};