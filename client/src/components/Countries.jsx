import * as React from 'react'
import { useSocket } from '../context/SocketContext'
import { useCookie } from '../hooks'
import Country from './Country/Country'
import NewCountry from './NewCountry'

const Countries = () => {
    const [countries, setCountries] = React.useState({});
    const [clientId] = useCookie("clientId")

    const socket = useSocket()

    React.useEffect(() => {
        socket.on('update', (data) => {
            // Instead of doing this sort of check, it is better to not emit an event at all to the originator.
            // eslint-disable-next-line eqeqeq
            if (clientId == data.clientId) {
                console.log(`Received an event from myself with data`, data)
                return
            } else {
                const updatedCountryId = data.country.id
                const updatedCountries = { ...countries }
                updatedCountries[updatedCountryId] = data.country
                
                setCountries(updatedCountries)
            }
        })

        return () => {
            socket.off('update')
        }
    }, [socket, countries, clientId])


    React.useEffect(() => {
        fetch('/list')
            .then(res => {
                return res.json()
            })
            .then(countries => {
                setCountries(countries)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const countriesArray = React.useMemo(() => {
        return Object.values(countries)
    }, [countries])

    return (
        <div>
            {
                countriesArray && countriesArray.map(country => (
                    <Country
                        key={country.id}
                        id={country.id}
                        name={country.name}
                        threat={country.threat}
                        countdown={country.countdown}
                        activated={country.activated}
                        eliminated={country.eliminated}
                    />
                ))
            }
            <NewCountry />
        </div>
    )
}

export default Countries