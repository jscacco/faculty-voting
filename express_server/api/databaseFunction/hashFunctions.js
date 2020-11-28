var crypto = require("crypto");
const fs = require("fs");

// TODO (Jack): Change this so the key is stored on the server or in the directory
// let tempKey = "test-key";
let SECRETKEY = null;


// UNCOMMENT ONCE ON SERVER
const readSecretKey = async () => {
    // Reads the secret key in from 'secret_key.txt'
    // code from
    // https://stackoverflow.com/questions/5784621/
    // how-to-read-binary-files-byte-by-byte-in-node-js
    SECRETKEY =  fs.readFileSync(__dirname + '/hmac_cred.txt', 'utf-8').slice(0,-3);
    return;
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
    //console.log("\n\n\n\nGenerating hash of: " + msg + "\n\n\n\n");
    
    let hmac = await generateHmac(msg);
    //console.log("\n\nHash: " + hmac + "\n\n");
    
    return hmac;
}

const generateRoomHash = async (room) => {
    // Given a room, generate the hash associated with it

    let msg = await generateRoomMsg(room);
    //console.log("Generating hash of: " + msg);
    
    let hmac = await generateHmac(msg);
    //console.log("Hash: " + hmac);
    
    return hmac;
}


// Reads in the JSON object stored in input_file
function readJsonFile (input_file, encoding){
    console.log("Reading JSON object from " + input_file);
    if (typeof (encoding) == 'undefined') {
	encoding = 'utf-8';
    }
    data =  fs.readFileSync(input_file, encoding);
    console.log("Retrieved JSON object: " + JSON.stringify(JSON.parse(data)));
    return JSON.parse(data);
}


// Given a room and poll id, get that poll's pepper from peppers.json
const getPollPepper = async (room_id, poll_id) => {
    console.log("Getting pepper for poll " + poll_id + " in room " + room_id + ".");
    let pepperData = readJsonFile(__dirname + '/peppers.json');
    if (pepperData !== null) {
        if ((room_id in pepperData) && (poll_id in pepperData[room_id])) {
            return pepperData[room_id][poll_id];
        } 
        else {
            console.log("No pepper data available for poll " + poll_id + " in " + room_id + ".");
            return "";
        }
    } 
    else {
        console.log("Unable to read from ./peppers.json");
        return "";
    }
}


const generateRandomPepper = () => {
    const buf = crypto.randomBytes(36);
    const pepper = buf.toString('base64');
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + pepper + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    return pepper;
}


// Given a room id, poll id, and pepper, sets the pepper in ./peppers.json
const addPollPepper = async (room_id, poll_id) => {
    console.log("\n\n\n\n\nAdding pepper for poll " + poll_id + " in room " + room_id);
    let pepperData = readJsonFile(__dirname + '/peppers.json');
    let pepper = await generateRandomPepper();
    
    if (pepperData !== null) {
        if ((room_id in pepperData) && (poll_id in pepperData[room_id])) {
            // Case 1: we already have a pepper set for that poll and room
            if (pepperData[room_id][poll_id] === pepper) {
            // Case 1a: it's the pepper we want
		console.log("Pepper " + pepper + " already set for poll " + poll_id + " in room " + room_id + ".");
            return;
            } 
            else {
                // Case 1b: it's not the pepper we want
                // This is the same code as in Case 2...
                pepperData[room_id][poll_id] = pepper;
		console.log("\n\nwriting pepper data!\n\n");
                fs.writeFileSync(__dirname + '/peppers.json', JSON.stringify(pepperData));
                return;
            }
        } 
        else if (room_id in pepperData) {
            // Case 2: The room already exists, but the poll doesn't
            pepperData[room_id][poll_id] = pepper;
	    console.log("\n\nwriting pepper data!\n\n");
            fs.writeFileSync(__dirname + '/peppers.json', JSON.stringify(pepperData));
            return;
        } 
        else {
            // Case 3: The room doesn't exist yet.
            pepperData[room_id] = {};
	    pepperData[room_id][poll_id] = pepper;
	    console.log("\n\nwriting pepper data!\n\n");
            fs.writeFileSync(__dirname + '/peppers.json', JSON.stringify(pepperData));
            return;
        }
    }
    else {
        console.log("Unable to read from ./peppers.json");
        return;
    }
}

// Delete the peppers for the given room
const  deleteRoomPeppers = async (room_id) => {
    let pepperData = await readJsonFile(__dirname + '/peppers.json');
    if (pepperData !== null) {
	delete pepperData[room_id];
	fs.writeFileSync(__dirname + '/peppers.json', JSON.stringify(pepperData));
    }
    return;
}

// Given a room id and poll id, delete that poll from ./peppers.json
const deletePollPepper = async (room_id, poll_id) => {
    console.log("Deleting pepper for poll " + poll_id + " in room " + room_id + ".");
    let pepperData = await readJsonFile(__dirname + '/peppers.json');
    if (pepperData !== null) {
        if ((room_id in pepperData) && (poll_id in pepperData[room_id])) {
            delete pepperData[room_id][poll_id];
            fs.writeFileSync(__dirname + '/peppers.json', JSON.stringify(pepperData));
            console.log("Pepper successfully deleted");
            return;
        } 
        else {
            //console.alert("No pepper data to delete for poll " + poll_id + " in " + room_id + ".");
            return;
        }
    } 
    else {
	    console.log("Unable to read from ./peppers.json");
	    return;
    }
}


// Expects a user_token, poll_id, and room_id
// Returns the peppered (obscured) token
const pepperToken = async (user_token, room_id, poll_id) => {
    fs.appendFileSync(__dirname + '/pepperLog.txt', "Peppering " + user_token + " for poll " + poll_id + " in room " + room_id + ".\n\n", {'flags': 'a'});
    console.log("Peppering " + user_token + " for poll " + poll_id + " in room " + room_id + ".");
    let pepper = await getPollPepper(room_id, poll_id);
    fs.appendFileSync(__dirname + '/pepperLog.txt', "Pepper: " + pepper + "\n\n", {'flags': 'a'});
    let msg = user_token + pepper;
    let pepperedToken = await generateHmac(msg);
    fs.appendFileSync(__dirname + '/pepperLog.txt', "pepperedToken: " + pepperedToken + "\n\n\n\n", {'flags': 'a'});
    console.log("pepperedToken: " + pepperedToken);
    return pepperedToken;
}


// Expects a vote of the format:
// vote = {
//     "choices": [00, 03],
// }
// a user token, and the room and poll ids to fetch the pepper
const generateVoteHash = async (vote, peppered_token, room_id, poll_id) => {
    console.log("Generating hash for " + JSON.stringify(vote) + " made by " + peppered_token);
    let msg = peppered_token + JSON.stringify(vote["choices"]);
    let voteHash = await generateHmac(msg);
    console.log("voteHash: " + voteHash);
    return voteHash;
}


const compareHashes = async (map, fetched, type) => {
    // Given a map and a fetched hash, see if the hash is good.
    // Output: true if good, false if bad
    let expectedHash = "";
    
    // See what we would expect hash to be
    if (type == "poll") {
	    expectedHash = await generatePollHash(map);
    } 
    else if (type == "room") {
	    expectedHash = await generateRoomHash(map);
    }
   
    if (expectedHash != fetched) {
        // The hashes don't match - bad!
        return false;
    } else {
        // The hashes match - good.
        return true;
    }
}


exports.generatePollHash = generatePollHash;
exports.generateRoomHash = generateRoomHash;
exports.compareHashes = compareHashes;
exports.generateVoteHash = generateVoteHash;
exports.pepperToken = pepperToken;
exports.deletePollPepper = deletePollPepper;
exports.addPollPepper = addPollPepper;
exports.deleteRoomPeppers = deleteRoomPeppers;
//module.exports = { generatePollHash, generateRoomHash, compareHashes };
