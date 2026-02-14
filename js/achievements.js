
// A side layer with achievements, with no prestige
addLayer("achievements", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    image: "resources/StarWow.svg",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    nodeStyle() {
        return {
            "background-size": "120%",
            "background-repeat": "no-repeat",
            "background-position": "center",
        }
    },
    color: "#dec72d",
    resource: "Achievement Score",
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            image: "resources/Moon.svg",
            name: "Self insert",
            done() {
                return hasUpgrade("main", 16)
            },
            goalTooltip: "Unlock the Moon Layer", // Shows when achievement is not completed
            doneTooltip: "Unlock the Moon Layer", // Showed when the achievement is completed
            style: {
                "height": "100px",
                "width": "100px",
                "corner-shape": "squircle",
                "background-repeat": "no-repeat",
                "background-position": "center",
            },
        },
        12: {
            image: "resources/Liz.svg",
            name: "I scream you scream",
            done() {
                return false
            },
            goalTooltip: "Unlock the Liz Layer", // Shows when achievement is not completed
            doneTooltip: "Unlock the Liz Layer", // Showed when the achievement is completed
            style: {
                "height": "100px",
                "width": "100px",
                "corner-shape": "squircle",
                "background-repeat": "no-repeat",
                "background-position": "center",
            },
        },
        13: {
            image: "resources/Cud.svg",
            name: "Best Buddy",
            done() {
                return false
            },
            goalTooltip: "Unlock the Cud Layer", // Shows when achievement is not completed
            doneTooltip: "Unlock the Cud Layer", // Showed when the achievement is completed
            style: {
                "height": "100px",
                "width": "100px",
                "corner-shape": "squircle",
                "background-repeat": "no-repeat",
                "background-position": "center",
            },
        },
    },
},
)