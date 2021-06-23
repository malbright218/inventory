module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        itemName: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        link: { type: DataTypes.STRING },
        quantity: { type: DataTypes.STRING },
        priceHist1: { type: DataTypes.DECIMAL(10, 2) },
        priceHist2: { type: DataTypes.DECIMAL(10, 2) },
        priceHist3: { type: DataTypes.DECIMAL(10, 2) },
        priceHist4: { type: DataTypes.DECIMAL(10, 2) },
        priceHist5: { type: DataTypes.DECIMAL(10, 2) },
        priceHist6: { type: DataTypes.DECIMAL(10, 2) },
        imgPath: { type: DataTypes.STRING },
        modifiedBy: { type: DataTypes.STRING }
    })

    return Item;
}