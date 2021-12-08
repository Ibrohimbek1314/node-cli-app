const catigoriesModel = require('./model/category.model.js')

let model = new catigoriesModel()

console.table(model.getCategories());