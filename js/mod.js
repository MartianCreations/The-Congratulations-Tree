let modInfo = {
	name: "The Congratulations Tree",
	author: "Moon Charm Muahaha",
	pointsName: "Congratulations Buttons",
	modFiles: ["statix.js", "moon.js", "liz.js", "cud.js", "tree.js", "achievements.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(13), // Used for hard resets and new players
	offlineLimit: 1.3,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.013",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = decimalOne

	if (hasUpgrade("main", 11)) {
		gain = gain.times(1.50)
	}
	if (hasUpgrade("moon", 11)) {
		gain = gain.times(13)
	}
	if (hasUpgrade("liz", 11)) {
		gain = gain.times(7)
	}
	if (hasUpgrade("main", 13)) {
		gain = gain.times(upgradeEffect("main", 13))
	}
	if (hasUpgrade("main", 15)) {
		gain = gain.times(upgradeEffect("main", 15))
	}
	if (hasUpgrade("main", 17)) {
		gain = gain.times(3)
	}
	if (hasUpgrade("main", 19)) {
		gain = gain.times(15)
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
	}
}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}