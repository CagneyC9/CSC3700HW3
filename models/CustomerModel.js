const db = require("../util/database");

module.exports = class CustomerPurchase {
    constructor( c, e ) {
        this.cust = c;
        this.email = e;
    }
    save() {
        return db.execute( 'insert into Customer (CustomerName, CustomerEmail) ' +
            'values (?, ?)', [this.cust, this.email])
    }

    static findById( id ){
        return db.execute( "SELECT * FROM Customer WHERE CustomerID = ?",
            [id] );
    }
    static fetchAll() {
        return db.execute("SELECT c.CustomerID, c.CustomerName, c.CustomerEmail, CONCAT('$', FORMAT(SUM(i.ItemPrice * s.Quantity), 2)) AS TotalSales " +
            "FROM Customer c " +
            "LEFT JOIN Sales s ON c.CustomerID = s.CustomerID " +
            "LEFT JOIN Item i ON s.ItemID = i.ItemID " +
            "GROUP BY c.CustomerName " +
            "ORDER BY SUM(i.ItemPrice * s.Quantity) DESC ");
    }

    update ( id ){
        return db.execute( "UPDATE Customer SET CustomerName = ?, CustomerEmail = ?  WHERE CustomerID = ?",
            [this.cust, this.email, id]);
    }
}
    //












    // static findById( id ){
    //     return db.execute( "select * from products where id = ?",
    //         [id] );
    // }

// 1.
// SELECT c.CustomerID, c.CustomerName, s.ItemID, s.Quantity, i.ItemPrice, SUM(i.ItemPrice * s.Quantity)
// as TotalSales
// 	FROM Customer c
//     	JOIN Sales s ON c.CustomerID = s.CustomerID
//         JOIN Item i ON s.itemID = i.ItemID
//           GROUP BY c.CustomerID
// 2. SELECT i.ItemName, SUM(i.ItemPrice * s.Quantity) AS TotalSales
// FROM Item i
// JOIN Sales s ON i.ItemID = s.ItemID
// GROUP BY i.ItemName
// Order by TotalSales DESC
// 3.
// SELECT  s.SalesDate as Date, c.CustomerName as Customer, i.ItemName as Product,
// s.quantity as Quantity, SUM(i.ItemPrice * s.Quantity) as TotalSales
// FROM Customer c JOIN Sales s ON c.CustomerID = s.CustomerID JOIN Item i ON s.ItemID = i.itemID
// GROUP BY CustomerName