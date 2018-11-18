import { db } from '../config/db' ;

export const bookParkingService = (parkingID,bool) => {
	db.ref('ParkingList').child(`${parkingID}`).update({isBooked:bool});
}