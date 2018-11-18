import { db } from '../config/db' ;

export const registerCarPlateService = (numberPlate) => {
	db.ref('UsersList/').push({
		numberPlate,
	})
	.then((data) => {
		console.log('data' , data)
	})
	.catch((error) => {
		console.log('error' , error)
	})
}