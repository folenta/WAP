const library = require('./library.js');

console.log("-----  Example 1  -----");

const person1 = new library.person("Ján Folenta", "xfolen00@vutbr.cz", "+421000111222");
library.nameHandler.processData(person1);

console.log("Success\n");


console.log("-----  Example 2  -----");

const person2 = new library.person("Ján Folenta", "xfolen00@vutbr.cz", "000111222");
library.nameHandler.processData(person2);

console.log("Success");