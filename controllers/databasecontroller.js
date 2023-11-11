const adminData = require("../routes/databaseroutes");
const CustomerData = require("../models/CustomerModel");
const MonthData = require("../models/MonthModel");
const ItemData = require("../models/ItemModel");


exports.getHome = async (req, res, next) => {
    let cust = await CustomerData.fetchAll();
    let item = await ItemData.fetchAll();
    let sale = await MonthData.getMonthly();

    res.render('Home', {
        from: 'Home',
        MyCustomers: cust[0].slice(0, 5),
        products: item[0].slice(0, 5),
        sales: sale[0].slice(0, 5)
    })
}
exports.getCustomer = (req, res, next) => {
    CustomerData.fetchAll()
        .then((rows, fieldData) => {
           res.render('Customer', {
               from: 'Customer',
               MyCustomers: rows[0]
           })

        })
}
exports.InsertCustomer = (req,res,next) => {
    res.render('InsertCustomer', {
        from: 'InsertCustomer'
    });
}
exports.PostCustomer = (req,res,next) => {
    let name = req.body.name
    let email = req.body.email
    const MyCustomer = new CustomerData(name, email)
    MyCustomer.save()
        .then(res.redirect("/Customer"))
}
exports.UpdateCustomer = ( req, res, next ) => {

    let id = req.params.id;
    console.log("We made it to the Update")
    CustomerData.findById(id)
        .then ((rows, fieldData) =>{
            res.render( 'UpdateCustomer', {
                from: 'customers',
                title : `Update the  Customer`,
                customer: rows[0][0]
            })
        }).catch( err => {
        console.log( "Update error: ");
        console.log( err );
    })
}
exports.postUpdateCustomer = ( req, res, next ) => {
    console.log("Update post sent")
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;

    const customer = new CustomerData( name, email );
    customer.update(id)
        .then((row, fieldData) => {
            res.redirect("/Customer");
        }).catch(err => {

    })
}
exports.getProducts = ( req, res, next) => {
    ItemData.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('Products', {
                from: 'Products',
                products: rows[0]
            })
        })
}
exports.InsertProduct = (req, res, next) => {
    res.render('InsertProduct',
        {

        from: 'InsertProduct' });

}
exports.PostProduct = (req, res, next) => {
    let name = req.body.name;
    let price = req.body.price;
    console.log(price)
    const items = new ItemData(name, price);
    items.save()
        .then(res.redirect("/Products"));
}
exports.getSales = ( req, res, next) => {
    MonthData.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('Sales', {
                from: 'Sales',
                sales: rows[0]
            })
        })
}


