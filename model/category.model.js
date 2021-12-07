const fs = require('fs')
const path = require('path')

module.exports = class CategoryModel {
    constructor(){
        this.path = path.join(process.cwd(), 'database', 'data.json')
    }

    #read (state){
       try{
        let categories =  fs.readFileSync(this.path, 'UTF-8')
        return categories ? JSON.parse(categories): []
       }catch(error){
           console.log(error.message);            
       }
    }

    get read (){
        let categories = this.#read()
        return categories.map( (el, i, arr) => {
            el.count = el.products.length
            delete el.products
            return el 
        }) 
    }

    // write (productName){
    //     let categories = this.read()
    // }
}