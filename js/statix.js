addLayer("main", {
    name: "statix", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/Statix.svg",
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
    color: "#dd2e44",
    requires: decimalOne, // Can be a function that takes requirement increases into account
    resource: "Runes", // Name of prestige currency
    baseResource: "Congratulations Buttons", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = decimalOne

        if (hasUpgrade("main", 14)) {
            mult = mult.times(5)
        }
        if (hasUpgrade("main", 17)) {
            mult = mult.times(3)
        }
        if (hasUpgrade("main", 18)) {
            mult = mult.times(upgradeEffect("main", 18))
        }
        if (hasUpgrade("main", 19)) {
            mult = mult.times(15)
        }
        if (hasUpgrade("main", 23)) {
            mult = mult.times(10)
        }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = decimalOne
        if (hasUpgrade("main", 12)) {
            exp = exp.times(1.01)
        }
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "c", description: "C: Run for Runes", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },


    upgrades: {
        11: {
            title: "Woke Liberal",
            description: "1.50x Congratulations Buttons",
            cost: new Decimal(10),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        12: {
            title: "i forgot what to name this",
            description: "^1.01 Runes",
            cost: new Decimal(12),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "scoop"
            }
        },
        13: {
            title: "Statixlings",
            description: "Congratulations Buttons scale off of Runes",
            cost: new Decimal(30),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
            effect() {
                return player[this.layer].points.pow(0.25).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        },
        14: {
            title: "Static Broadcast",
            description: "5.00x Runes",
            cost: new Decimal(80),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        15: {
            title: "㊗",
            description: "Congratulations Points now scale off of Congratulations Points",
            cost: new Decimal(300),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
            effect() {
                return player.points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        },
        16: {
            title: "Watch The Stars",
            description: "Unlock Moon Layer",
            cost: new Decimal(1300),
            style: {
                "height": "200px",
                "width": "200px",
                "corner-shape": "squircle",
                "border-radius": "5%",
            },
            persisting: true,
        },
        17: {
            title: "Mreow",
            description: "3.00x Runes and 3.00x Congratulations Buttons",
            cost: new Decimal(1500),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        18: {
            title: "m!p uhh",
            description: "Multiply Runes porportional to the time since last reset (Cap: 50,000x)",
            cost: new Decimal(5000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
            effect() {
                return new Decimal(player["main"].resetTime).min(50000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        },
        19: {
            title: "@new role anyone a15",
            description: "15.00x Runes and 15.00x Congratulations Points",
            cost: new Decimal(15000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        21: {
            title: "They Are An Immoral Person",
            description: "Unlock Liz Layer",
            cost: new Decimal(27000),
            style: {
                "height": "200px",
                "width": "200px",
                "corner-shape": "squircle",
                "border-radius": "5%",
            },
            persisting: true,
        },
        22: {
            title: "Admin",
            description: "5.00x to all layers connecting to this one",
            cost: new Decimal(30000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        23: {
            title: "Inflation",
            description: "0.10x Congratulations Buttons but 10.00x Runes",
            cost: new Decimal(50000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        27: {
            title: "Blue Spec On A Petri Dish",
            description: "Unlock Cud Layer",
            cost: new Decimal(700000),
            style: {
                "height": "200px",
                "width": "200px",
                "corner-shape": "squircle",
                "border-radius": "5%",
            },
            persisting: true,
        },
    },


    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",

        "clickables",
        "milestones",

        "blank",
        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13],]],
        ["row", [["upgrade", 14], ["upgrade", 15],]],
        "blank",
        ["row", [["upgrade", 16],]],
        "blank",
        ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19],]],
        "blank",
        ["row", [["upgrade", 21],]],
        "blank",
        ["row", [["upgrade", 22], ["upgrade", 23],]],
    ],


})
