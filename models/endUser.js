module.exports = function (sequelize, DataTypes) {
    var EndUser = sequelize.define("EndUser", {
        name: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        location: { type: DataTypes.STRING },
        itemHist1: { type: DataTypes.STRING },
        itemHist2: { type: DataTypes.STRING },
        itemHist3: { type: DataTypes.STRING },
        itemHist4: { type: DataTypes.STRING },
        itemHist5: { type: DataTypes.STRING },
        itemHist6: { type: DataTypes.STRING },
        itemHist7: { type: DataTypes.STRING },
        itemHist8: { type: DataTypes.STRING },
        itemHist9: { type: DataTypes.STRING },
        itemHist10: { type: DataTypes.STRING },
        itemHist11: { type: DataTypes.STRING },
        itemHist12: { type: DataTypes.STRING },
        itemHist2Date: { type: DataTypes.DATEONLY },
        itemHist3Date: { type: DataTypes.DATEONLY },
        itemHist4Date: { type: DataTypes.DATEONLY },
        itemHist5Date: { type: DataTypes.DATEONLY },
        itemHist6Date: { type: DataTypes.DATEONLY },
        itemHist7Date: { type: DataTypes.DATEONLY },
        itemHist8Date: { type: DataTypes.DATEONLY },
        itemHist9Date: { type: DataTypes.DATEONLY },
        itemHist10Date: { type: DataTypes.DATEONLY },
        itemHist11Date: { type: DataTypes.DATEONLY },
        itemHist12Date: { type: DataTypes.DATEONLY }
    })

    return EndUser;
}