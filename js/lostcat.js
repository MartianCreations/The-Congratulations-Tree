addLayer("lostcat", {
    name: "lostcat", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/Lostcat.svg",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            cash: new Decimal(0)
        }
    },
    nodeStyle() {
        return {
            "background-size": "110%",
            "background-repeat": "no-repeat",
            "background-position": "center",
        }
    },
    color: "#808080",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Fishes", // Name of prestige currency
    baseResource: "Planets", // Name of resource prestige is based on
    baseAmount() { return player["moon"].points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = decimalOne
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = decimalOne

        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["moon"],
    hotkeys: [
        { key: "f", description: "F: Fish for Fish", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() {
        if (hasUpgrade("moon", 16)) {
            unlocked = true
            return true
        }
    },

    clickables: {
        11: {
            title: "Sell Fish",
            display() { return "Sell your fish!" },
            canClick() {
                return player[this.layer].points.gt(0)
            },
            onClick() {
                mult = decimalOne
                if (hasUpgrade("lostcat", 11)) {
                    mult = mult.times(1.5)
                }

                player[this.layer].cash = player[this.layer].cash.add(player[this.layer].points.times(mult))
                player[this.layer].points = decimalZero

            },
            style: {
                "height": "100px",
                "width": "300px",
                "border-radius": "0%",
                "corner-shape": "squircle"
            },
        }
    },

    upgrades: {
        11: {
            title: "I Like Money!",
            description: "Fishes sell for 1.50x more",
            cost: new Decimal(5),
            cash: new Decimal(5),

            fullDisplay() {
                return "<h3>" + this.title + "</h3><br>" + this.description + "<br><br>Cost: $" + this.cash + ", " + this.cost + " Fish"
            },

            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },

            onPurchase() {
                return player[this.layer].cash.sub(this.cash)
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost) && player[this.layer].cash.gte(this.cash)
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
        "blank",
    ],
})
