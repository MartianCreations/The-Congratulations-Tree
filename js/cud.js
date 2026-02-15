addLayer("cud", {
    name: "cud", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/Cud.svg",
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
    color: "#006bf7",
    requires: new Decimal(70000), // Can be a function that takes requirement increases into account
    resource: "Ameobas", // Name of prestige currency
    baseResource: "Congratulations Buttons", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.17, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = decimalOne
        if (hasUpgrade("cud", 11)) {
            mult = mult.times(2)
        }
        if (hasUpgrade("main", 22)) {
            mult = mult.times(5)
        }
        if (hasUpgrade("main", 27)) {
            mult = mult.times(7)
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
        { key: "a", description: "A: Split for Amoebas", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() {
        if (hasUpgrade("main", 26)) {
            unlocked = true
            return true
        }
    },


    upgrades: {
        11: {
            title: "Single Celled",
            description: "2x Ameobas",
            cost: new Decimal(10),
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
        ["row", [["upgrade", 11],]],
    ],
})
