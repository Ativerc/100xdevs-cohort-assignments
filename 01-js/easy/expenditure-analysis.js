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
  let categories = [];
  let cartegoriesValue = [];
  // if transactions[i][category] present in categories
  // categories
  for (let i = 0; i < transactions.length; i++) {
    if (categories.includes(transactions[i]['category'])) {
      let getIndex = categories.indexOf(transactions[i]['category']);
      cartegoriesValue[getIndex] += transactions[i]['price'];
    } else {
      categories.push(transactions[i]['category']);
      cartegoriesValue.push(transactions[i]['price']);
    }
  }
  let output = [];
  for (let i = 0; i < categories.length; i++) {
    countObject = {
      category: categories[i],
      totalSpent: cartegoriesValue[i]
    }
    output.push(countObject);
  }

  return output;
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

// ]

// console.log(calculateTotalSpentByCategory(testObjectArray));

module.exports = calculateTotalSpentByCategory;
