addLayer("moon", {
    name: "moon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/Moon.svg",
    startData() {
        return {
            unlocked: true,
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
    color: "#7f0fda",
    requires: new Decimal(1313), // Can be a function that takes requirement increases into account
    resource: "Planets", // Name of prestige currency
    baseResource: "Congratulations Buttons", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.26, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = decimalOne

        if (hasUpgrade("main", 22)) {
            mult = mult.times(5)
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
        { key: "p", description: "P: Search for Planets", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { if (hasUpgrade("main", 16)) { return true } },


    upgrades: {
        11: {
            title: "Meteor",
            description: "13x Congratulations Buttons",
            cost: new Decimal(50),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
    }
})
