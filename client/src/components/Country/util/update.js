const update = async (url, data) => {
    const resp = await fetch(url, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return resp.json
}

export default update