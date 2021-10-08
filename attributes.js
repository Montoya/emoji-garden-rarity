// Imports
const fs = require("fs");
var gardensWithAttributes = []; 

(async () => {
  // Load loot data
  const data = await fs.readFileSync("./output/gardens.json");
  var loot = JSON.parse(data);

  // Calculate attribute rarities
  let rarityIndex = {};
  for (let i = 0; i < loot.length; i++) {
	const gardenId = loot[i]['id']; 
    const gardenEmoji = loot[i]['emoji'];
	
	var occurences = []; 
	
    // Add up number of occurences of attributes
    for (const emoji of Object.values(gardenEmoji)) {
		if(emoji!="🌼" && emoji!="🌻") { 
			occurences[emoji] = occurences[emoji] ? occurences[emoji] + 1 : 1; 
		}
		else { 
			occurences[emoji] = 1; 
		}
    }
	
	var attributes = []; 
	
	for (const emoji of Object.keys(occurences)) { 
		attributes.push(emoji); 
		if(occurences[emoji]>1){ 
			attributes.push(emoji+emoji); 
			if(occurences[emoji]>2){
				attributes.push(emoji+emoji+emoji); 
				if(occurences[emoji]>3) { 
					attributes.push(emoji+emoji+emoji+emoji); 
				}
			}
		}
	}
	
	if(gardenEmoji[0]==gardenEmoji[2]==gardenEmoji[6]==gardenEmoji[8]==gardenEmoji[1]==gardenEmoji[3]==gardenEmoji[5]==gardenEmoji[7]) { 
		attributes.push("Symmetry:Perfect"); 
	}
	if(gardenEmoji[0]==gardenEmoji[2]==gardenEmoji[6]==gardenEmoji[8] && 
		gardenEmoji[1]==gardenEmoji[3]==gardenEmoji[5]==gardenEmoji[7]) { 
		attributes.push("Symmetry:Rotational"); 
	}
	if (gardenEmoji[0]==gardenEmoji[2]&&gardenEmoji[3]==gardenEmoji[5]&&gardenEmoji[6]==gardenEmoji[8]) { 
		attributes.push("Symmetry:Horizontal"); 
	}
	if (gardenEmoji[0]==gardenEmoji[6]&&gardenEmoji[1]==gardenEmoji[7]&&gardenEmoji[2]==gardenEmoji[8]) {
		attributes.push("Symmetry:Vertical"); 
	}
	if (gardenEmoji[1]==gardenEmoji[4]&&gardenEmoji[2]==gardenEmoji[6]&&gardenEmoji[5]==gardenEmoji[7]) {
		attributes.push("Symmetry:Diagonal"); 
	}
	else if (gardenEmoji[0]==gardenEmoji[8]&&gardenEmoji[1]==gardenEmoji[5]&&gardenEmoji[3]==gardenEmoji[7]) {
		attributes.push("Symmetry:Diagonal"); 
	}
	
	var squares = 0; 
	
	if(gardenEmoji[0]==gardenEmoji[1]&&gardenEmoji[3]==gardenEmoji[4]&&gardenEmoji[0]==gardenEmoji[3]) { 
		squares++;  
	}
	if(gardenEmoji[1]==gardenEmoji[2]&&gardenEmoji[4]==gardenEmoji[5]&&gardenEmoji[1]==gardenEmoji[4]) { 
		squares++; 
	}
	if(gardenEmoji[3]==gardenEmoji[4]&&gardenEmoji[6]==gardenEmoji[7]&&gardenEmoji[3]==gardenEmoji[6]) { 
		squares++; 
	}
	if(gardenEmoji[4]==gardenEmoji[5]&&gardenEmoji[7]==gardenEmoji[8]&&gardenEmoji[4]==gardenEmoji[7]) { 
		squares++; 
	}
	
	if(squares>0) { 
		attributes.push("Squares:"+squares); 
	}
	
	var bingos = 0; 
	
	if(gardenEmoji[0]==gardenEmoji[1] && gardenEmoji[0]==gardenEmoji[2]) { 
		bingos += 1; 
	}
	if(gardenEmoji[3]==gardenEmoji[4] && gardenEmoji[3]==gardenEmoji[5]) { 
		bingos += 1; 
	}
	if(gardenEmoji[6]==gardenEmoji[7] && gardenEmoji[6]==gardenEmoji[8]) { 
		bingos += 1; 
	}
	
	if(gardenEmoji[0]==gardenEmoji[3] && gardenEmoji[0]==gardenEmoji[6]) { 
		bingos += 1; 
	}
	if(gardenEmoji[1]==gardenEmoji[4] && gardenEmoji[1]==gardenEmoji[7]) { 
		bingos += 1; 
	}
	if(gardenEmoji[2]==gardenEmoji[5] && gardenEmoji[2]==gardenEmoji[8]) { 
		bingos += 1; 
	}
	
	if(gardenEmoji[0]==gardenEmoji[4] && gardenEmoji[0]==gardenEmoji[8]) { 
		bingos += 1; 
	}
	if(gardenEmoji[2]==gardenEmoji[4] && gardenEmoji[2]==gardenEmoji[6]) { 
		bingos += 1; 
	}
	
	if(bingos>0) { 
		attributes.push("Bingos:"+bingos); 
	}
	
	loot[i]['attributes'] = attributes; 
  }

  // Output occurences
  await fs.writeFileSync(
    "./output/gardens_with_attributes.json",
    JSON.stringify(loot)
  );
})();
