const generator  = require('../lib/idgenerator.js')
const fs = require('fs')
const path = require('path')

module.exports = class CategoryModel {
    #path
    constructor(){
        this.#path = path.join(process.cwd(), 'database', 'data.json')
    }

    #read (state){
       try{
        let categories =  fs.readFileSync(this.#path, 'UTF-8')
        return categories ? JSON.parse(categories): []
       }catch(error){
           console.log(error.message);            
       }
    }

    getCategories (){
        let categories = this.#read()
        return categories.map( (el, i, arr) => {
            el.count = el.products.length
            delete el.products
            return el 
        }) 
    }

    addCategory (categoryName){
        try{
            let categories = this.#read()
            if( categories.find(e => e.categoryName == categoryName)){
                throw new Error(`The category ${categoryName} already exists`)
            }
            categories.push({
                categoryId: generator(),
                categoryName,
                products: []
            })
            fs.writeFileSync(this.#path, JSON.stringify(categories, null, 4))
            return true
        }catch(error){
            console.log(error.message);
        }
    }
}