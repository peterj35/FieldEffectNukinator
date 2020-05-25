import * as React from 'react'

import { API_URL, DEFAULT_TIME } from '../../common'
import { useInterval } from '../../hooks'
import { update, remove } from './util'

import Toast from '../Toast'

import './Country.css';

const getTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds - min * 60
    const formattedSec = (sec) => sec > 9 ? "" + sec : "0" + sec
    return `${min}:${formattedSec(sec)}`
}

const Country = ({ id, name, threat, countdown, activated, eliminated }) => {
    const [dirty, setDirty] = React.useState(activated)

    const [time, setTime] = React.useState(countdown)
    const [threatLevel, setThreatLevel] = React.useState(threat)
    const [countingDown, setCountingDown] = React.useState(activated)

    const [showToast, setShowToast] = React.useState(false)
    const [toastMessage, setToastMessage] = React.useState(null)


    // If the country was modified by another user, set them - but now don't allow further updates from this client
    React.useEffect(() => {
        // display modal 

        if (threat !== threatLevel) {
            setShowToast(true)
            setToastMessage(`Threat level for ${name} changed from ${threatLevel} to ${threat}`)
            setThreatLevel(threat)
            setDirty(true)
        }

        if (activated !== countingDown) {
            setCountingDown(activated)
            setDirty(true)
        }

        if (countdown !== time) {
            setTime(countdown)
            setDirty(true)
        }
        /**
         * Disable exhaustive-deps rule because we don't want to run when local state vars
         * countingDown, threatLevel, and time change.
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threat, activated, name, countdown])

    useInterval(() => {
        if (countingDown && !dirty) {
            if (time - 1 > 0) {
                update(`${API_URL}/update`, {
                    id,
                    countdown: time - 1,
                })

                setTime(time - 1)
            } else {
                remove(`${API_URL}/delete`, {
                    id,
                })
                setCountingDown(false)
                setShowToast(true)
                setToastMessage(`${name} has been wiped out!`)
            }
        }
    }, 1000)

    const onToggle = React.useCallback(() => {
        if (!dirty) {
            setCountingDown(prev => {
                setTime(DEFAULT_TIME)
                update(`${API_URL}/update`, {
                    id,
                    countdown: DEFAULT_TIME,
                    activated: !prev,
                })

                return !prev
            })
        }
    }, [setCountingDown, id, dirty])

    const onThreatChange = React.useCallback((e) => {
        const newThreatLevel = e.target.value
        setThreatLevel(newThreatLevel)

        update(`${API_URL}/update`, {
            id,
            threat: Number(newThreatLevel),
        })
    }, [id])

    const actionLabel = () => {
        if (dirty) {
            return '💩'
        }

        if (countingDown) {
            return 'Abort!'
        } else {
            return 'Commence Launch!'
        }
    }

    return (
        <>
            {!eliminated && (
                <div className={`country threat-${threatLevel}`}>
                    <span className="column">
                        {dirty ? `💩` : `🍃`}
                    </span>
                    <span className="column" onClick={onToggle}>
                        <button>{ actionLabel() }</button>
                    </span>
                    <span className="column">
                        {getTime(time)}
                    </span>
                    <span className="column">
                        {name}
                    </span>
                    <span className="column">
                        <input type="number" value={threatLevel} min="1" max="5" onChange={onThreatChange} />
                    </span>
                </div>
            )}
            <div>
                <Toast open={showToast} onClose={() => setShowToast(false)}>
                    {toastMessage}
                </Toast>
            </div>
        </>
    )
}

export default Country
