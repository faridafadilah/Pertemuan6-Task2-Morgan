const fs = require('fs');

// Cek Folder Data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Cek FIle contact.json
const filePath = './data/contact.json';
if(!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// Membaca Data
const loadContact = () => {
    const file = fs.readFileSync(filePath, 'utf-8'); // Membaca file
    const contacts = JSON.parse(file); // Mengubah data ke JSON
    return contacts;
}

// Mencari Data
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama === nama);
  return contact;
}

// Cek Duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama );
}

// Simpan Data
const saveContact = (contacts) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
}

// Tambah Contact
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact); // Push data
  // Save Contact
  saveContact(contacts);
}

// Menghapus Data
const deleteContact = (nama) => {
  const contacts = loadContact();
  const NewContact = contacts.filter((contact) => contact.nama !== nama);
  // Save Contact
  saveContact(NewContact);
}

// Mengupdate Data Contact Berdasarkan nama
const updateContact = (contactBaru) => {
  const contacts = loadContact();
  //hilangkan contact lama yang namanya sama dengan oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContact(filteredContacts);
};

module.exports = { loadContact, findContact, saveContact, addContact, cekDuplikat, deleteContact, updateContact };