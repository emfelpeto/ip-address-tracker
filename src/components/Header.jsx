import { useEffect } from "react"
import { useState, useContext } from 'react'
import { Form } from "./Form"
import { LocationContext } from "./LocationContext"

export function Header() {
    const APIKEY = 'at_sGP5LtANgGf0SRC6YwzeJibGxY5lp'
    const {location, setLocation} = useContext(LocationContext)
    const [ipAddress, setipAddress] = useState('')
    const [isValid, setIsValid] = useState(true);
    const [ip, setIp] = useState('')

    useEffect(() => {
        if (ipAddress !== '') {
            fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}&ipAddress=${ipAddress}`)
            .then(response => response.json())
            .then(data => {
                const { location, ip, isp } = data;
                setLocation({
                    address: ip,
                    city: location.city,
                    utc: location.timezone,
                    isprovider: isp,
                    location: location
                })
                setIsValid(true);
        })}
      }, [ipAddress])

    const handleForm = (e) => {
        e.preventDefault();
        const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/; // Regex for IP address validation

        if (ipPattern.test(ip)) {
            setIsValid(true);
            setipAddress(ip);
            e.target.reset();
        } else {
            setIsValid(false);
        }
    }

    const handleInputIp = (e) => {
        setIp(e.target.value)
    }

    return (
        <header className="header">
            <div className="wrapper center">
                <h1 className="header_title">IP Address Tracker</h1>
                {!isValid && <h5 className="header_error">Must enter a valid IP Address</h5>}
                <Form handleForm={handleForm} handleInput={handleInputIp} />
                <div className="header_desc">
                    <div>
                        <p>IP Address</p>
                        <p className="large_text">
                            <span className="address">
                                {location.address}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>Location</p>
                        <p className="large_text">
                            <span className="location">
                                    {location.city}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>Timezone</p>
                        <p className="large_text">
                            <span className="utc">
                                {location.utc}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>ISP</p>
                        <p className="large_text">
                            <span className="isp">
                                {location.isprovider}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}