import sjcl from 'sjcl';

// TODO (Jack): Change this so the key is stored on the server or in the directory
var KEY = "test-key";

const generateHash = async (map) => {
    // Given a data map, generate the hash associated with it

    console.log("generating hash on " + JSON.stringify(map));

    let mapCopy = map;
    
    delete mapCopy['roomHash'];
    delete mapCopy['pollHash'];
    
    let msg = JSON.stringify(mapCopy);
    let key = sjcl.codec.utf8String.toBits(KEY);
    let out = (new sjcl.misc.hmac(key, sjcl.hash.sha256)).mac(msg);
    let hmac = sjcl.codec.hex.fromBits(out);

    console.log("hash: " + hmac);
    
    return hmac;
}

const compareHashes = async (map, fetched) => {
    // Given a map and a fetched hash, see if the hash is good.
    // Output: true if good, false if bad

    // See what we would expect hash to be
    let expectedHash = await generateHash(map);
   
    if (expectedHash != fetched) {
        // The hashes don't match - bad!
        return false;
    } else {
        // The hashes match - good.
        return true;
    }
}

export { generateHash, compareHashes };
