var crypto = require("crypto");
//UNCOMMENT ONCE ON SERVER
// const fs = require("fs");

// TODO (Jack): Change this so the key is stored on the server or in the directory
// let tempKey = "test-key";
let SECRETKEY = null;


/*
// UNCOMMENT ONCE ON SERVER
const readSecretKey = async () => {
    // Reads the secret key in from 'secret_key.txt'
    // code from
    // https://stackoverflow.com/questions/5784621/
    // how-to-read-binary-files-byte-by-byte-in-node-js
    fs.readFile('secret_key.txt', (err, data) => {
	if (err) {
	    console.log(err);
	}
	SECRETKEY = data;
    });
}

*/
// This is a dummy func since we can't do file reading on react
const readSecretKey = async () => {
    SECRETKEY = "placeholder secret key";
}


const generatePollMsg = async (poll) => {
    let msg = "";
    msg += "id=" + poll['id'] + ";";
    msg += "title=" + poll['title'] + ";";
    msg += "status=" + poll['status'] + ";";
    msg += "type=" + poll['type'] + ";";
    msg += "desc=" + poll['description'] + ";";
    msg += "userInputOption=" + poll['userInputOption'] + ";";
    msg += "optionsOrder=" + JSON.stringify(poll['optionsOrder']) + ";";
    msg += "showResults=" + poll['showResults'] + ";";
    msg += "options={";
    const optKeys = Object.keys(poll['options']).sort();
    optKeys.forEach((key, index) => {
	msg += "" + key + ":{";
	const optKeys2 = Object.keys(poll['options'][key]).sort();
	optKeys2.forEach((key2, index2) => {
	    msg += "" + key2 + ":" + poll['options'][key][key2] + "";
	});
	msg += "}";
    });
    msg += "};";
    return msg;
}


const generateRoomMsg = async (room) => {
    let msg = "";
    msg += "id=" + room['id'] + ";";
    msg += "title=" + room['title'] + ";";
    msg += "status=" + room['status'] + ";";
    msg += "hosts=" + room['hosts'] + ";";
    msg += "pollOrder={\"pending\":" + JSON.stringify(room['pollOrder']['pending']);
    msg += ",\"closed\":" + JSON.stringify(room['pollOrder']['closed']);
    msg += ",\"open\":" + JSON.stringify(room['pollOrder']['open']) + "}";

    return msg;
}


const generateHmac = async (msg) => {
    // If we haven't yet read in the secret key, do so now.
    if (SECRETKEY === null) {
	await readSecretKey();
    }
    const hmac = crypto.createHmac('sha256', SECRETKEY);
    hmac.update(msg);
    return hmac.digest('hex');
}


const generatePollHash = async (poll) => {
    // Given a poll, generate the hash associated with it

    let msg = await generatePollMsg(poll);
    console.log("Generating hash of: " + msg);

    let hmac = await generateHmac(msg);
    console.log("Hash: " + hmac);

    return hmac;
}

const generateRoomHash = async (room) => {
    // Given a room, generate the hash associated with it

    let msg = await generateRoomMsg(room);
    console.log("Generating hash of: " + msg);

    let hmac = await generateHmac(msg);
    console.log("Hash: " + hmac);

    return hmac;
}


// Reads in the JSON object stored in input_file
const readJsonFile = (input_file) => {
    console.log("Reading JSON object from " + input_file);
    fs.readFile(input_file, (err, data) => {
	if (err) {
	    console.log(err);
	    return null;
	} else {
	    let parsedData = JSON.parse(data);
	    console("Retrived JSON object " + JSON.stringify(parsedData));
	    return parsedData;
	}
    });
}


// Given a room and poll id, get that poll's pepper from peppers.json
const getPollPepper = async (room_id, poll_id) => {
    console.log("Getting pepper for poll " + poll_id + " in room " + room_id + ".");
    let pepperData = await readJsonFile('peppers.json');
    if (pepperData !== null) {
	if ((room_id in pepperData) && (poll_id in pepperData[room_id])) {
	    return pepperData[room_id][poll_id];
	} else {
	    console.alert("No pepper data available for poll " + poll_id + " in " + room_id + ".");
	    return "";
	}
    } else {
	console.log("Unable to read from peppers.json");
	return "";
    }
}


// Given a room id, poll id, and pepper, sets the pepper in peppers.json
const setPollPepper = async (room_id, poll_id, pepper) => {
    console.log("Setting pepper " + pepper + " for poll " + poll_id + " in room " + room_id + ".");
    let pepperData = await readJsonFile('peppers.json');
    if (pepperData !== null) {
	if ((room_id in pepperData) && (poll_id in pepperData[room_id])) {
	    // Case 1: we already have a pepper set for that poll and room
	    if (pepperData[room_id][poll_id] === pepper) {
		// Case 1a: it's the pepper we want
		console.log("Pepper " + pepper + " already set for poll " + poll_id + " in room " + room_id + ".");
		return;
	    } else {
		// Case 1b: it's not the pepper we want
		// This is the same code as in Case 2...
		pepperData[room_id][poll_id] = pepper;
		fs.writeFileSync('peppers.json', JSON.stringify(pepperData));
		return;
	    }
	} else if (room_id in pepperData) {
	    // Case 2: The room already exists, but the poll doesn't
	    pepperData[room_id][poll_id] = pepper;
	    fs.writeFileSync('peppers.json', JSON.stringify(pepperData));
	    return;
	} else {
	    // Case 3: The room doesn't exist yet.
	    pepperData[room_id] = {poll_id: pepper};
	    fs.writeFileSync('peppers.json', JSON.stringify(pepperData));
	    return;
	}
    } else {
	console.log("Unable to read from peppers.json");
	return;
    }
}


// Given a room id and poll id, delete that poll from peppers.json
const deletePollPepper = async (room_id, poll_id) => {
    console.log("Deleting pepper for poll " + poll_id + " in room " + room_id + ".");
    let pepperData = await readJsonFile('peppers.json');
    if (pepperData !== null) {
	if ((room_id in pepperData) && (poll_id in pepperData[room_id])) {
	    delete pepperData[room_id][poll_id];
	    fs.writeFileSync('peppers.json', JSON.stringify(pepperData));
	    console.log("Pepper successfully deleted");
	    return;
	} else {
	    console.alert("No pepper data to delete for poll " + poll_id + " in " + room_id + ".");
	    return;
	}
    } else {
	console.log("Unable to read from peppers.json");
	return;
    }
}


// Expects a user_token, poll_id, and room_id
// Returns the peppered (obscured) token
const pepperToken = async (user_token, room_id, poll_id) => {
    console.log("Peppering " + user_token + " for poll " + poll_id + " in room " + room_id + ".");
    let pepper = await getPollPepper(room_id, poll_id);
    let msg = user_token + pepper;
    let pepperedToken = await generateHmac(msg);
    console.log("pepperedToken: " + pepperedToken);
    return pepperedToken;
}


// Expects a vote of the format:
// vote = {
//     choices: [00, 03],
// }
// a user token, and the room and poll ids to fetch the pepper
const generateVoteHash = async (vote, peppered_token, room_id, poll_id) => {
    console.log("Generating hash for " + JSON.stringify(vote) + " made by " + user_id);
    let msg = peppered_token + JSON.stringify(vote[choices]);
    let voteHash = await generateHmac(msg);
    console.log("voteHash: " + voteHash);
    return voteHash;
}


const compareHashes = async (map, fetched, type) => {
    // Given a map and a fetched hash, see if the hash is good.
    // Output: true if good, false if bad

    let expectedHash = "";

    // See what we would expect hash to be
    if (type === "poll") {
	expectedHash = await generatePollHash(map);
    } else if (type == "room") {
	expectedHash = await generateRoomHash(map);
    }

    if (expectedHash !== fetched) {
        // The hashes don't match - bad!
        return false;
    } else {
        // The hashes match - good.
        return true;
    }
}

export { generatePollHash, generateRoomHash, compareHashes, generateVoteHash, pepperToken };
