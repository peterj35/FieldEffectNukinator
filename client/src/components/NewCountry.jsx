import * as React from 'react'

import { API_URL, DEFAULT_TIME } from '../common'
import { create } from './Country/util'

import './NewCountry.css'

const countryNames = [
    'Canata',
    'United France',
    'Brumany',
    'Sweland',
    'Alrocco',
    'Antarctica',
    'Rapture',
    'Gotham',
    'Los Santos',
    'Silent Hill',
    'Chicaton',
    'Sealand',
    'Aiur',
    'Shakuras',
    'Char',
    'Chatheopia'
]

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

let id = getRandomInt(99999)

const NewCountry = () => {
    const [name, setName] = React.useState(countryNames[getRandomInt(countryNames.length)])
    const [threatLevel, setThreatLevel] = React.useState(getRandomInt(5) + 1)

    const createCountry = React.useCallback(() => {
        create(`${API_URL}/create`, {
            id,
            countdown: DEFAULT_TIME,
            threat: threatLevel,
            name,
            eliminated: false,
            activated: false
        })

        id++
        setName(countryNames[getRandomInt(countryNames.length)])
        setThreatLevel(getRandomInt(5) + 1)
    }, [name, threatLevel])

    const setCountryName = React.useCallback((e) => {
        const newName = e.target.value
        setName(newName)
    }, [setName])

    const setThreat = React.useCallback((e) => {
        const newThreatLevel = e.target.value
        setThreatLevel(newThreatLevel)
    }, [setThreatLevel])

    return (
        <div className="newCountry">
            <div className="nc-column">
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" value={name} onChange={setCountryName} />
            </div>
            <div className="nc-column">
                <label htmlFor="threat">Threat: </label>
                <input id="threat" type="number" value={threatLevel} min="1" max="5" onChange={setThreat} />
            </div>
            <div className="nc-column">
                <button onClick={createCountry}>
                    Create Country!
                </button>
            </div>
        </div>
    )
}

export default NewCountry