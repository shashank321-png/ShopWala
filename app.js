// app.js

// Function to retrieve customer data from local storage
function getCustomers() {
    return JSON.parse(localStorage.getItem('customers')) || [];
}

// Function to save customer data to local storage
function saveCustomers(customers) {
    localStorage.setItem('customers', JSON.stringify(customers));
}

// Function to render customer list
function renderCustomerList() {
    const customers = getCustomers();
    let tableBody = document.getElementById("customerItems");
    let str = "";
    customers.forEach((customer, index) => {
        str += `
            <tr onclick="showCustomerDetails(${index})" style="cursor: pointer;">
            <th scope="row">${index + 1}</th>
            <td>${customer.name}</td>
            <td>${customer.purchaseCount}</td> 
            <td>${customer.purchaseAmount}</td> 
            </tr>`;
    });
    tableBody.innerHTML = str;
}


// Function to show customer details
function showCustomerDetails(index) {
    const customers = getCustomers();
    const customer = customers[index];
    document.getElementById('customerName').textContent = `Name: ${customer.name}`;
    document.getElementById('purchaseCount').textContent = `Purchases: ${customer.purchaseCount}`;
    document.getElementById('purchaseAmount').textContent = `Amount: ${customer.purchaseAmount}`;
    
    // Show edit and delete buttons
    document.getElementById('editButton').style.display = 'inline-block';
    document.getElementById('deleteButton').style.display = 'inline-block';
    
    // Set the selected customer index
    selectedCustomerIndex = index;
}


// Function to add a new customer
function addCustomer() {
    const name = prompt('Enter customer name:');
    const purchaseCount = parseInt(prompt('Enter number of purchases:'));
    const purchaseAmount = parseFloat(prompt('Enter total amount of purchases:'));
    const newCustomer = {
        name,
        purchaseCount,
        purchaseAmount
    };
    const customers = getCustomers();
    customers.push(newCustomer);
    saveCustomers(customers);
    renderCustomerList();
}

// Function to edit customer details
function editCustomer() {
    const newName = prompt('Enter new name:');
    const newPurchaseCount = parseInt(prompt('Enter new number of purchases:'));
    const newPurchaseAmount = parseFloat(prompt('Enter new total amount of purchases:'));
    const customers = getCustomers();
    const customer = customers[selectedCustomerIndex];
    customer.name = newName;
    customer.purchaseCount = newPurchaseCount;
    customer.purchaseAmount = newPurchaseAmount;
    saveCustomers(customers);
    renderCustomerList();
    document.getElementById('customerName').textContent = '';
    document.getElementById('purchaseCount').textContent = '';
    document.getElementById('purchaseAmount').textContent = '';
    document.getElementById('editButton').style.display = 'inline-block';
    document.getElementById('deleteButton').style.display = 'inline-block';
}

// Function to confirm and delete a customer
function confirmDelete() {
    if (confirm('Are you sure you want to delete this customer?')) {
        deleteCustomer();
    }
}

// Function to delete customer
function deleteCustomer() {
    const customers = getCustomers();
    customers.splice(selectedCustomerIndex, 1);
    saveCustomers(customers);
    renderCustomerList();
    document.getElementById('customerName').textContent = '';
    document.getElementById('purchaseCount').textContent = '';
    document.getElementById('purchaseAmount').textContent = '';
    document.getElementById('editButton').style.display = 'inline-block';
    document.getElementById('deleteButton').style.display = 'inline-block';
}

function clearStorage() {
    if (confirm("Do you really want to clear?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        renderCustomerList();
    }
}

let selectedCustomerIndex = -1; // To keep track of selected customer index

// Initial rendering
renderCustomerList();
