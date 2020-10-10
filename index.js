const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const vault = JSON.parse(fs.readFileSync('creds.json', 'utf8'));


const passwords = vault.credentials.map(p => ({
  "id": uuidv4(),
  "organizationId": null,
  "folderId": null,
  "type": 1,
  "name": p.id,
  "notes": null,
  "favorite": false,
  "login": {
    "username": p.username,
    "password": p.password,
    "totp": null
  },
  "collectionIds": null
}))

const notes = vault.notes.map(n => ({
  "id": uuidv4(),
  "organizationId": null,
  "folderId": null,
  "type": 2,
  "name": n.title,
  "notes": n.content,
  "favorite": false,
  "secureNote": {
    "type": 0
  },
  "collectionIds": null
}))

const cards = vault.cards.map(c => ({
  "id": uuidv4(),
  "organizationId": null,
  "folderId": null,
  "type": 3,
  "name": c.name,
  "notes": c.notes,
  "favorite": false,
  "card": {
    "cardholderName": "Leonti Bielski",
    "brand": "Visa",
    "number": c.number,
    "expMonth": c.month,
    "expYear": c.year,
    "code": c.code,
  },
  "collectionIds": null
}))

const result = {
  folders: [],
  items: passwords.concat(notes).concat(cards)
}

fs.writeFileSync('bitwarden.json', JSON.stringify(result, null, 2))