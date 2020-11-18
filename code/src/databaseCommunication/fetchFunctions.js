const fetchDelete = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        cache: 'no-cache', 
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer'
    });

    return response;
}

const fetchPost = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache', 
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer'
    });

    return response;
}

const fetchPut = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        cache: 'no-cache', 
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer'
    });

    return response;
}

const fetchGet = async (url = '') => {

    return await fetch(url);
}

export { fetchDelete, fetchPut, fetchPost, fetchGet };