import {URL} from 'url';

const myUrl = new URL('http://my-website.domain:8080/hello.html?id=100&status=active');

// Get serialised URL.
console.log(myUrl.href);
console.log(myUrl.toString());

// Host. Includes the port.
console.log(myUrl.host);

// Hostname. Does not include the port.
console.log(myUrl.hostname);

// Pathname.
console.log(myUrl.pathname);

// Serialised query string.
console.log(myUrl.search);

// Query as params.
console.log(myUrl.searchParams);

// Add query params.
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);

// Loop through query params.
myUrl.searchParams.forEach((value, name) => {
   console.log(`${name}: ${value}`);
});