// Helper method for generating a hash based on the object
function objectToHash(obj) {
    var str = "";
    for (j in obj) {
        if (typeof obj[j] == 'string') {
            str += obj[j];
        }
    }
    return hex_sha1(str);
}