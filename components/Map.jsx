import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css'; // Import CSS dari leaflet-geosearch
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

function MapView() {
    useEffect(() => {
        let map = null;

        if (!document.getElementById('map').classList.contains('leaflet-container')) {
            map = L.map('map').setView([-7.2575, 112.7521], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            const provider = new OpenStreetMapProvider();
            const searchControl = new GeoSearchControl({
                provider: provider,
            });

            map.addControl(searchControl);

            const points = [
                [-7.2575, 112.7521],
                [-7.2675, 112.7621],
                [-7.275, 112.7921],
            ];

            points.forEach(point => {
                L.marker(point)
                    .addTo(map)
                    .bindPopup('Some information about the point');
            });
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return (
        <div className="w-full flex justify-center z-0 p-[10px]">
            <div id="map" className='w-full lg:w-[60%] z-0 h-[500px] rounded-xl'></div>
        </div>
    );
}

export default MapView;
