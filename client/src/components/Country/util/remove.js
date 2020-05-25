const remove = async (url, data) => {
    const resp = await fetch(url, {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return resp.json
}

export default remove