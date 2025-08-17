/*
//Challenge1
let Name:string = "Reem"
Name=Name.toUpperCase();
console.log(Name);
//Challenge2
let sum:number = 20
sum = sum + 30
console.log(sum)
//Challenge3
let isok:boolean = sum  >= 18
console.log(isok)
console.log(!isok)

let tax:number | string = 10
tax = "$100"
console.log(tax)

let requestSuccess: 'Error' | 'Success' = 'Success'
requestSuccess = 'Error'
requestSuccess = 'Success'
console.log(requestSuccess)

let foundBook;
let books = ['We were liars','Cant hurt me','Atomic Habits']
for(let book of books) {
    if(book == 'Atomic Habits') {
        foundBook = book
        break;
    }
}
console.log(foundBook)


let orderStatus: 'Processing'| 'Shipped' | 'Delivered' | 'Cancelled' = 'Processing'
orderStatus = 'Shipped'
orderStatus = 'Delivered'

let discount:number |string= 20
discount = '20%'
console.log(discount)

let mixedArray: (string|number)[] = ['Reem', 30, 'Ali', 25]

//Objects
let Cars:{brand:string , model:string} ={brand:'Toyota', model:'2020'}
console.log(Cars)

//Create an object bike of type { brand: string, year: number } and assign it some values. Then, try to assign a string to the year property.
//Create an object laptop of type { brand: string, year: number } and try to assign an object with missing year property to it.
//Create an array products of type { title: string, price?: number }[] and assign it some values. Then, try to add an object with a price property of type string to it.

let bike:{brand:string; year:number} ={brand:'Mercedes'}
console.log(bike)

//Alias
type Employee={id:number,name:string,department:string}
type ManagerType ={id:number,name:string,Employees:Employee[]}
const Nigist:Employee={
    id:1,
    name:'Nigist',
    department:'HR'
}
const Hana:Employee={
    id:2,
    name:'Hana',
    department:'Finance'
}

const Reem:ManagerType={
    id:2,
    name:'Reem',
    Employees:[Nigist,Hana]
}

console.log(Reem);
*/
const url = 'https://www.course-api.com/react-tours-project';
async function fetchData(url:string){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){
        const errorMsg = error instanceof Error? error.message : 'An error occurred';
    }
}