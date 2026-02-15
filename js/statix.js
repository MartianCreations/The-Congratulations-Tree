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

        if (hasAchievement("achievements", 12)) {
            mult = mult.times(4)
        }
        if (hasAchievement("achievements", 13)) {
            mult = mult.times(7)
        }

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
            mult = mult.times(8)
        }
        if (hasUpgrade("main", 25)) {
            mult = mult.times(1.5)
        }
        if (hasUpgrade("moon", 11)) {
            mult = mult.times(1.3)
        }
        if (hasUpgrade("moon", 12)) {
            mult = mult.times(3.9)
        }

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = decimalOne
        if (hasUpgrade("main", 12)) {
            exp = exp.times(1.01)
        }
        if (hasUpgrade("main", 25)) {
            exp = exp.times(0.95)
        }
        if (hasUpgrade("moon", 13)) {
            exp = exp.times(1.1)
        }
        return exp
    },
    passiveGeneration() {
        gain = decimalOne

        function canGenPoints() {
            if (hasUpgrade("moon", 15)) {
                return true
            }
            return false
        }
        if (!canGenPoints()) {
            gain = new Decimal(0)
        }

        return gain
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
            description: "Congratulations Buttons now scale off of Congratulations Buttons",
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
                if (hasUpgrade("main", 24)) {
                    return new Decimal(player["main"].resetTime).times(1.25).min(50000)
                }
                return new Decimal(player["main"].resetTime).min(50000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        },
        19: {
            title: "@new role anyone a15",
            description: "15.00x Runes and 15.00x Congratulations Buttons",
            cost: new Decimal(300000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        21: {
            title: "They Are An Immoral Person",
            description: "Unlock Liz Layer",
            cost: new Decimal(7000000),
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
            cost: new Decimal(10000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        23: {
            title: "Inflation",
            description: "0.10x Congratulations Buttons but 8.00x Runes",
            cost: new Decimal(30000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        24: {
            title: "*ALARM BLARES*",
            description: "Increase the effectiveness of <b>'m!p uhh'</b>",
            cost: new Decimal(500000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        25: {
            title: "Analog Horror Scream",
            description: "^0.95 and 1.50x Runes",
            cost: new Decimal(1000000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        26: {
            title: "Blue Spec On A Petri Dish",
            description: "Unlock Cud Layer",
            cost: new Decimal(7000000000),
            style: {
                "height": "200px",
                "width": "200px",
                "corner-shape": "squircle",
                "border-radius": "5%",
            },
            persisting: true,
        },
        27: {
            title: "CUD!! DON'T ABBREVIATE CLICK POWER!!! CUD!!!!",
            description: "7.77x Amoebas",
            cost: new Decimal(500000000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        28: {
            title: "moon can i voice more dac characters",
            description: "13.00x Planets",
            cost: new Decimal(500000000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        29: {
            title: "lizaDEAD",
            description: "7.00x H-E-B Creamy Creations Neapolitan Ice Creams",
            cost: new Decimal(500000000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
        },
        52: {
            title: "YURI!? WHERE!?",
            description: "If the Liz Layer and Fizzy Layer are both unlocked, they start to scale off of eachother.",
            cost: new Decimal(50000000000),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            },
            effect() {
                return player["liz"].points.log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        }
    },


    tabFormat: [
        "main-display",
        "resource-display",
        "prestige-button",
        "blank",

        "clickables",
        "milestones",

        "blank",
        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],]],
        ["row", [["upgrade", 15],]],
        "blank",
        ["row", [["upgrade", 16],]],
        "blank",
        ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19],]],
        "blank",
        ["row", [["upgrade", 21],]],
        "blank",
        ["row", [["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25],]],
        "blank",
        ["row", [["upgrade", 26],]],
        "blank",
        ["row", [["upgrade", 27], ["upgrade", 28], ["upgrade", 29],]],
        "blank",
    ],


})
