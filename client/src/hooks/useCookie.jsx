import * as React from 'react'

// From https://www.quirksmode.org/js/cookies.html
const readCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const useCookie = (name) => {
    const getCookie = () => readCookie(name)
    const [cookie, ] = React.useState(getCookie())

    return [cookie]
}

export default useCookie