const db = require("../util/database");

module.exports = class CurrentMonthSales {
    static fetchAll() {
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%Y-%m-%d') AS Date, " +
            "c.CustomerName, i.ItemName, s.Quantity, " +
            "CONCAT('$', FORMAT(SUM(i.ItemPrice * s.Quantity), 2)) AS TotalSales FROM Sales s " +
            "JOIN Customer c ON s.CustomerID = c.CustomerID " +
            "JOIN Item i ON s.ItemID = i.ItemID " +
            "WHERE MONTH(s.SalesDate) = MONTH(CURDATE()) AND YEAR(s.SalesDate) = YEAR(CURDATE()) " +
            "GROUP BY Date, c.CustomerName, i.ItemName, s.Quantity " +
            "ORDER BY Date")
    }

    static getMonthly() {
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%M %Y') AS Date," +
            " CONCAT('$', FORMAT(SUM(i.ItemPrice * s.Quantity), 2)) AS TotalSales " +
            "FROM Sales s JOIN Item i on s.ItemID = i.ItemID " +
            "WHERE s.SalesDate <= LAST_DAY(CURDATE()) " +
            "GROUP BY DATE_FORMAT(s.SalesDate, '%Y-%m') " +
            "ORDER BY DATE_FORMAT(s.SalesDate, '%Y-%m') DESC;");
    }

}