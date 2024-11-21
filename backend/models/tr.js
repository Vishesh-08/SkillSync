const bcrypt = require('bcrypt');

const originalPassword = 'Paripakwa@1234';
const  storedHash = '$2b$10$55kQftrHh4jsrhjuZE1gS.RiHpYM.KbprQ9.LWq1uuvqdnhN4eLCq';
var r;
// Compare passwords
const k=async ()=>{r=await bcrypt.hash(originalPassword,10); }
bcrypt.compare(originalPassword, r )
  .then(isMatch => console.log("Does it match?", isMatch))
  .catch(err => console.error("Error:", err));