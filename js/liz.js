addLayer("liz", {
    name: "liz", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/Liz.svg",
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    nodeStyle() {
        return {
            "background-size": "110%",
            "background-repeat": "no-repeat",
            "background-position": "center",
        }
    },
    color: "#ff0000",
    requires: new Decimal(7000), // Can be a function that takes requirement increases into account
    resource: "H-E-B Creamy Creations Neapolitan Ice Creams", // Name of prestige currency
    baseResource: "Congratulations Buttons", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.27777777, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = decimalOne
        if (hasUpgrade("liz", 11)) {
            mult = mult.times(0.7)
        }
        if (hasUpgrade("main", 22)) {
            mult = mult.times(5)
        }
        if (hasUpgrade("main", 29)) {
            mult = mult.times(7.00)
        }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = decimalOne
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["main"],
    hotkeys: [
        { key: "l", description: "L: Purchase H-E-B Creamy Creations Neapolitan Ice Creams", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() {
        if (hasUpgrade("main", 21)) {
            unlocked = true
            return true
        }
    },


    upgrades: {
        11: {
            title: "You Can Do This Girl!",
            description: "7.00x Congratulations Points but 0.7x H-E-B Creamy Creations Neapolitan Ice Cream",
            cost: new Decimal(10),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        12: {
            title: "Take Off Your Shirt Moon!!!",
            description: "2.60x Planets",
            cost: new Decimal(39),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
    },

    tabFormat: [
        "main-display",
        "resource-display",
        "prestige-button",
        "blank",

        "clickables",
        "milestones",

        "blank",
        ["row", [["upgrade", 11], ["upgrade", 12],]],
        "blank",
    ],
})
