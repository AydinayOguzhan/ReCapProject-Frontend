export interface Rental{
    id:number,
    carId:number,
    customerId:number
    userId:number,
    firstName:string,
    lastName:string,
    description:string,
    modelYear:number,
    brandName:string,
    dailyPrice:number,
    companyName:string,
    rentDate:Date,
    returnDate:Date
}