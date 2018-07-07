var mysql = require("mysql")
var inquirer = require("inquirer")

var PORT = process.env.PORT || 3306

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: PORT,
    user: "root",
    password: "root",
    database: "store"
})

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err
    console.log("CONNECTED ON PORT:" + PORT)
    start()
})

function start() {
    var store
    var ids = []
    var itemID = ""
    var itemQuant = 0
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err
        // console.log(results)
        store = results
        // console.log(store)
        console.log(`   Item ID   |    Product Name    |    Department Name    |    Price    |   Stock Quantity      `)
        for (i in results) {
            ids.push(results[i].item_id.toString())
            console.log(
                `----------------------------------------------------------------------------------------------
    ${results[i].item_id}           ${results[i].product_name}              ${results[i].department_name}             ${results[i].price}             ${results[i].stock_quantity}`
            )
        }
        inquirer
            .prompt([{
                name: "selectItemID",
                type: "input",
                message: "Please enter ID of item you wish to purchase"
            }])
            .then(function (answer) {
                itemID = answer.selectItemID
                // console.log(itemID)
                inquirer
                    .prompt([{
                        name: "selectQuantity",
                        type: "input",
                        message: "Please enter quantity to purchase"
                    }])
                    .then(function (answer) {
                        itemQuant = answer.selectQuantity
                        // console.log(itemQuant)
                        purchase(itemID, itemQuant, ids)
                    })
            })
    })
}

function purchase(itemID, itemQuant, ids) {
    if (ids.includes(itemID)) {
        connection.query(`SELECT * FROM products WHERE item_id = ${itemID}`, function (err, results) {
            if (err) throw err
            var inStock = parseInt(results[0].stock_quantity)
            // console.log(inStock)
            if (inStock > 0 && inStock >= itemQuant) {
                updateQuantity(itemID, itemQuant, inStock)
            } else {
                console.log("Insufficient quantity in stock.")
                start()
            }
        })
    } else {
        console.log('invalid ID chosen.')
        start()
    }
}

function updateQuantity(itemID, itemQuant, inStock) {
    connection.query(`UPDATE products SET stock_quantity = ${inStock - itemQuant} WHERE item_id = ${itemID}`, function (err, results) {
        if (err) throw err
        // console.log(results)
    })
    start()
}
