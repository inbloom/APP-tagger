// Helper function for capitalizing strings
function capitalize(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function($1) {
       return $1.toUpperCase();
    });
}