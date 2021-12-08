const categoriesModel = require('./model/category.model.js')
let model = new categoriesModel()
const [,, categoryName ] = process.argv

model.addCategory(categoryName) && console.log(`category ${categoryName} has been added!`);

