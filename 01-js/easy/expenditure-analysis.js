/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let categoryTotal = {};
  transactions.forEach((element, index, array) => {;
    // if (categoryTotal[element.category])
    if (!categoryTotal[element.category]) {
      categoryTotal[element.category] = 0;
    }
    categoryTotal[element.category] += element.price;
  });
  // return categoryTotal;
  return (Object.entries(categoryTotal)).map(([key, value]) => ({
    category: key,
    totalSpent: value,
  }));
}

// let testObjectArray = [{
//   id: 1,
//   timestamp: 1656076800000,
//   price: 10,
//   category: 'Food',
//   itemName: 'Pizza',
// }, 
// {
//   id: 2,
//   timestamp: 1656076800180,
//   price: 2,
//   category: 'Food',
//   itemName: 'Samosa',
// }, 
// {
//   id: 3,
//   timestamp: 1656076800360,
//   price: 8,
//   category: 'Food',
//   itemName: 'Biryani',
// },
// {
//   id: 3,
//   timestamp: 1656076800480,
//   price: 12,
//   category: 'Cloth',
//   itemName: 'Shirt',
// },

// ]

// console.log(calculateTotalSpentByCategory(testObjectArray));

module.exports = calculateTotalSpentByCategory;
