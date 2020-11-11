import sjcl from 'sjcl';

// TODO (Jack): Change this so the key is stored on the server or in the directory
var tempKey = "test-key";

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
    let key = sjcl.codec.utf8String.toBits(tempKey);
    let out = (new sjcl.misc.hmac(key, sjcl.hash.sha256)).mac(msg);
    let hmac = sjcl.codec.hex.fromBits(out);
    return hmac;
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

const compareHashes = async (map, fetched, type) => {
    // Given a map and a fetched hash, see if the hash is good.
    // Output: true if good, false if bad

    let expectedHash = "";
    
    // See what we would expect hash to be
    if (type == "poll") {
	expectedHash = await generatePollHash(map);
    } else {
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

export { generatePollHash, generateRoomHash, compareHashes };
