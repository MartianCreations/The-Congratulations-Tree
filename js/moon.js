addLayer("moon", {
    name: "moon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/Moon.svg",
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
        if (hasUpgrade("main", 28)) {
            mult = mult.times(13)
        }
        if (hasUpgrade("moon", 11)) {
            mult = mult.times(0.52)
        }
        if (hasUpgrade("liz", 12)) {
            mult = mult.times(2.6)
        }
        if (hasUpgrade("cud", 12)) {
            mult = mult.times(13)
        }


        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = decimalOne

        if (hasUpgrade("moon", 12)) {
            exp = exp.times(0.8)
        }

        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["main"],
    hotkeys: [
        { key: "p", description: "P: Search for Planets", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() {
        if (hasUpgrade("main", 16)) {
            unlocked = true
            return true
        }
    },


    upgrades: {
        11: {
            title: "Masochism",
            description: "0.52x Planets but 1.30x Runes",
            cost: new Decimal(13),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        12: {
            title: "you wanted heals...",
            description: "0.13x Congratulations Buttons but 3.90x to all layers connecting to this one",
            cost: new Decimal(260),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        13: {
            title: "i forgot what to name this again",
            description: "^1.10 Runes",
            cost: new Decimal(520),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        14: {
            title: "Sillium",
            description: "13.00x Congratulations Buttons",
            cost: new Decimal(650),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        15: {
            title: "Type 1 Civilization",
            description: "Start passively generating Runes",
            cost: new Decimal(1300),
            style: {
                "height": "150px",
                "width": "150px",
                "corner-shape": "squircle"
            }
        },
        16: {
            title: "Found Cat",
            description: "Unlock the Lostcat Layer",
            cost: new Decimal(10000),
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
    ],
})
