// Imports
const fs = require("fs");

(async () => {
  // Load loot data
  const data = await fs.readFileSync("./output/probability.json");
  const gardens = JSON.parse(data);
  
  var output = ""; 
  
  for (let i = 0; i < gardens.length; i++) {
	  
	output += "<tr>";
	output += "<td><a href='https://opensea.io/assets/0x690dbdf6bb1712f01b34e80c25553db869df8bf9/"+gardens[i]['gardenId']+"'>"+gardens[i]['gardenId']+"</a></td>"; 
	output += "<td>"+gardens[i]['emoji']+"</td>"; 
	output += "<td>"+gardens[i]['attributes']+"</td>"; 
	output += "<td>"+gardens[i]['rarest']+"</td>"; 
	output += "</tr>\n"; 
	
  }

  // Output occurences
  await fs.writeFileSync(
    "./output/rarity_table.html",
    output
  );

})();
