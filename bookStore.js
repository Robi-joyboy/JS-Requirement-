const bookIds = [1, 2, 2, 3];
const customerId = 101;

let booksBill = [];
let finalAmount;
let discountPrice;

let totalAmount = 0;
let totalDiscount = 0;

let books = [ 
    {id: 1, title: "Psycology of Money", price: 150, stock: 10},
    {id: 2, title: "Harry Potter", price: 500, stock: 10},
    {id: 1, title: "Psycology of Money", price: 150, stock: 10},
    {id: 1, title: "Psycology of Money", price: 150, stock: 10},
    {id: 3, title: "Time Paradox", price: 300, stock: 10},
    {id: 4, title: "Astro Physics", price: 600, stock: 10},
    {id: 5, title: "NSL", price: 1000, stock: 10}
];

let customers = [
    {id: 100, name: "Sulaiman", isExisting: true, lastPurchase: null},
    {id: 101, name: "Muthu", isExisting: true, lastPurchase: null},
    {id: 102, name: "Subas", isExisting: true, lastPurchase: null},
    {id: 103, name: "Robin", isExisting: false, lastPurchase: null},
];

function removeDuplicateObj(){ //Duplicate   [  ].map

    let uniqueBook = [
        ...new Set(books.map(JSON.stringify))
    ].map(JSON.parse);

    return uniqueBook;
};
books = removeDuplicateObj();
console.log("Unique Books",books);

function chosenBooks(){ //Chosen Books
    let chosen = books.filter(ids => ids.id in bookIds);
    for (let i of books){
        for (let id of new Set(bookIds)){
            if (i.id === id){
                let count = bookIds.filter(num => num === id).length;
                i.count = count;
            };
        };
    };
    return chosen;
};
const chosed = chosenBooks();console.log("\nChosen Books",chosed);

function purchasedBook(title, quantity, price, discount, finalPrice){
    return { title, quantity, price, discount, finalPrice };
}

function existingCustomer(){

    for (let book of chosed){

        let discount = (book.price >= 200) ? 15 : 0;

        discountPrice = (book.price * discount)/100;
        finalAmount = book.price - discount;

        totalAmount += finalAmount*book.count;
        totalDiscount += discountPrice*book.count;
        
        let item = purchasedBook(book.title, book.count, (book.price*book.count), discountPrice*book.count, finalAmount*book.count);
        booksBill.push(item);
        
    }
    booksBill.push(totalAmount);
    booksBill.push(totalDiscount);

    return booksBill;
}

function newCustomer(){

    for (let book of chosed){
        
        let discount = (book.price > 750) ? 15 :
            (book.price > 500) ? 10 :
            (book.price > 200) ? 5 :
            (book.price >= 100) ? 2 : 0;

        discountPrice = (book.price * discount)/100;
        finalAmount = book.price - discountPrice;

        totalAmount += finalAmount*book.count; 
        totalDiscount += discountPrice*book.count;
        
        let item = purchasedBook(book.title, book.count, (book.price*book.count), discountPrice*book.count, finalAmount*book.count);
        booksBill.push(item);
        
    }
    booksBill.push(totalAmount);
    booksBill.push(totalDiscount);

    return booksBill;
}

function calculateDiscount(customers, customerId){

    let customer = customers.filter(details => details.id === customerId );
    return (customer[0].isExisting) ? existingCustomer() : newCustomer();
};
let bookBill = calculateDiscount(customers, customerId);

function finalBill(){

    let customerDetails = customers.find(detail => detail.id === customerId);
    console.log("bill ----> ",bookBill.slice(0, -2));
    return {
        bill:{
            customerName: customerDetails.name,
            booksPurchased: bookBill.slice(0, -2),
            totalPrice: bookBill[ bookBill.length - 2 ],
            totalDiscount: bookBill[ bookBill.length - 1 ]
        }
    }
}

function updateStock(){
    
    for (let bookDetail of books){
        for (let chosedBookDetail of chosed){
            if (bookDetail.id === chosedBookDetail.id){
                bookDetail.stock = bookDetail.stock - chosedBookDetail.count;
                delete bookDetail.count;
            }
        }
    }
    return books

}

function updatedCustomerDetails(){
    customers.map(detail => {
        if (detail.id === customerId){
            detail.isExisting = true;
            detail.lastPurchase = bookBill.slice(0, -2);
        };
    } );
    return customers
}

console.log("\n\n",finalBill());
console.log("\nupdatedStock:",updateStock())
console.log("\nupdatedCustomerDetails:",updatedCustomerDetails())
