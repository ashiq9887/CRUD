// Getting contacts from SessionStorage
let contacts = JSON.parse(sessionStorage.getItem("contacts")) || [];
let editIndex = -1;
// Getting HTML elements
let contactForm = document.getElementById("contactForm");
let contactList = document.getElementById("contactList");
let search = document.getElementById("search");
let submitBtn = document.getElementById("submitBtn");
// Function to display contacts
function displayContacts(list = contacts) {
    contactList.innerHTML = "";
    list.forEach(function(contact, index) {
        let row = `
            <tr>
                <td>${contacts.indexOf(contact) + 1}</td>
                <td>${(contact.name)}</td>
                <td>${(contact.phone)}</td>
                <td>${(contact.email)}</td>

                <td>
                    <button class="edit-btn" onclick="editContact(${contacts.indexOf(contact)})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteContact(${contacts.indexOf(contact)})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        contactList.innerHTML += row;
    });
}
// Add and Update Contact
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let contact = {
        name: name,
        phone: phone,
        email: email
    };
    if(editIndex === -1) {
        // Add new contact
        contacts.push(contact);
    } else {
        // Update existing contact
        contacts[editIndex] = contact;
        editIndex = -1;
        submitBtn.innerText = "Add Contact";
    }
    // Save contacts in SessionStorage
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
    contactForm.reset();
    displayContacts();
});
// Edit Contact
function editContact(index) {
    document.getElementById("name").value = contacts[index].name;
    document.getElementById("phone").value = contacts[index].phone;
    document.getElementById("email").value = contacts[index].email;
    editIndex = index;
    submitBtn.innerText = "Update Contact";
}
// Delete Contact
function deleteContact(index) {
    if(confirm("Are you sure you want to delete this contact?")) {
        contacts.splice(index, 1);
        sessionStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts();
    }
}
// Search Contact by Name
search.addEventListener("input", function() {
    let searchValue = search.value.toLowerCase();
    let filteredContacts = contacts.filter(function(contact) {
        return contact.name.toLowerCase().includes(searchValue);
    });
    displayContacts(filteredContacts);
});
// Display contacts when page loads
displayContacts();