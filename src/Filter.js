import memoize from './Memoize';

const sortNearest = ( rides ) => {
    rides.sort((a, b) => (a.distance - b.distance));
    return rides;
};

const calculateDistanceAndSort = (rides, user) => {
    rides.forEach(ride => {
        ride.distance = Math.min(...ride.station_path.map(path => Math.abs(path - user?.station_code)))
    })

    return sortNearest(rides);
};

const applyFilter = (rides, {upcoming=true, location={}}) => {
    let dateNow = new Date();
    let filteredRides = rides.filter( ride => {
        let rideDate = new Date(ride.date);
        return (
            ((upcoming==='all') || (upcoming ? (rideDate > dateNow) : (rideDate < dateNow))) &&
            (!location?.state || ride.state === location?.state) &&
            (!location?.city || ride.city === location?.city)
            )
    })

    return filteredRides;
};


const getUsableData = ({ rides, user, filter, category }) => {
    let obj = {
        nearest: function() {
            return applyFilter(calculateDistanceAndSort(rides, user), {upcoming: 'all', location:filter})
        },
        upcoming: function(){
            return applyFilter(calculateDistanceAndSort(rides, user), {upcoming: true, location:filter});
        },
        past:function(){
            return applyFilter(calculateDistanceAndSort(rides, user), {upcoming: false, location:filter});
        }
    }
    return obj[category]();
};

// let rides = [
//     { "id": 305, "origin_station_code": 11, "station_path": [58, 65, 71, 85], "destination_station_code": 99, "date": "12/14/2021 04:06 PM", "map_url": "https://picsum.photos/200", "state": "Nagaland", "city": "Kohima" },
//     { "id": 900, "origin_station_code": 19, "station_path": [65, 78, 80], "destination_station_code": 90, "date": "12/14/2021 01:23 AM", "map_url": "https://picsum.photos/200", "state": "Andhra Pradesh", "city": "Rajam" },
//     { "id": 653, "origin_station_code": 14, "station_path": [30, 43, 53, 61, 77, 88], "destination_station_code": 93, "date": "03/25/2022 01:18 AM", "map_url": "https://picsum.photos/200", "state": "Tripura", "city": "Khowai" }, 
//     { "id": 185, "origin_station_code": 19, "station_path": [41, 51, 65, 77, 86], "destination_station_code": 98, "date": "02/01/2022 02:27 AM", "map_url": "https://picsum.photos/200", "state": "Telangana", "city": "Kyathampalle" }, 
//     { "id": 968, "origin_station_code": 13, "station_path": [60, 74, 81], "destination_station_code": 95, "date": "12/17/2021 06:33 AM", "map_url": "https://picsum.photos/200", "state": "Goa", "city": "Panaji" }, 
//     { "id": 372, "origin_station_code": 2, "station_path": [31, 43, 52, 66, 73, 86], "destination_station_code": 96, "date": "03/14/2022 09:44 PM", "map_url": "https://picsum.photos/200", "state": "Chhattisgarh", "city": "Tilda Newra" }, 
//     { "id": 620, "origin_station_code": 17, "station_path": [23, 36, 46, 53, 64, 76, 82], "destination_station_code": 98, "date": "12/18/2021 04:48 PM", "map_url": "https://picsum.photos/200", "state": "Mizoram", "city": "Lunglei" }, 
//     { "id": 186, "origin_station_code": 10, "station_path": [59, 61, 73, 84], "destination_station_code": 98, "date": "12/28/2021 11:26 AM", "map_url": "https://picsum.photos/200", "state": "Nagaland", "city": "Kera" }, 
//     { "id": 152, "origin_station_code": 14, "station_path": [47, 51, 69, 71, 88], "destination_station_code": 99, "date": "01/29/2022 03:05 PM", "map_url": "https://picsum.photos/200", "state": "West Bengal", "city": "Sonamukhi" }, 
//     { "id": 479, "origin_station_code": 2, "station_path": [65, 75, 87], "destination_station_code": 98, "date": "13/14/2021 03:16 AM", "map_url": "https://picsum.photos/200", "state": "Jharkhand", "city": "Jamshedpur" }, 
//     { "id": 120, "origin_station_code": 10, "station_path": [39, 45, 50, 69, 74, 80], "destination_station_code": 98, "date": "02/01/2022 04:31 PM", "map_url": "https://picsum.photos/200", "state": "Delhi", "city": "New Delhi" }
// ]
// let user = {
//     "station_code":90,
//     "name":"Malcolm Parker",
//     "url":"https://picsum.photos/200"
// };
// let filter = {
//     state:"Nagaland",
//     city:"Kera"
// }
// let category = "upcoming";


// console.log(getUsableData({ rides, user, filter, category }))
// console.log(getUsableData({ rides, user, filter, category }))
// console.log(getUsableData({ rides, user, filter, category }))



export default getUsableData;
export {sortNearest, calculateDistanceAndSort, applyFilter};