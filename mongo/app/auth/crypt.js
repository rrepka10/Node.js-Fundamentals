// Used to encrypt the user account PW 
// alias hash as genHash and compare as compareValue
import {genSalt, hash as genHash, compare as compareValue} from 'bcrypt';

// Function to hash (encrypt) the original PW
export const hash = async (plainText) => {
	
	// Get a salt value
    const salt = await genSalt(12);

	// Generate the hash from the user data using the salt
    return await genHash(plainText, salt);
}

// Compare the current PW with a previous PW
export const compare = async (plainText, hash) => {
	// returns true or false
    return await compareValue(plainText, hash);
}