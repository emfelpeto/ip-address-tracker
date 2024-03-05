import { useState, useContext, useEffect } from "react";
import { LocationContext } from "./LocationContext";

export function Footer() {
     const {location} = useContext(LocationContext)
     let map;

    useEffect(()=>{
        if (Object.keys(location.location).length !== 0) {
            create_map(location.location.lat, location.location.lng, location.location.country, location.location.region)
        }
        return () => {
            if (map !== undefined && map !== null) {
                map.remove()
            }
        }
    },[location])
    
    function create_map(lat, lng, country, region) {
        map = L.map('map').setView([lat, lng], 14);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`${region}, ${country}`)
            .openPopup();
   }

    return (
        <footer className="footer">
            <div className="map" id="map" />
        </footer>
    )
}