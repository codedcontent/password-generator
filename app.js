// Welcome anyone who cared to look at the source code, This is my greatest project so far because I actually gave this my all, LOL. Can you imagine that, me giving it my all. Thanks tho❤.



// Get the main div
const maniDiv = document.getElementById('mainDiv');

// Store the possible page contents
const contents = {
    homeContent: `
        <span class="welcome-text">Hi, i'm your personal password generator</span>
        <span class="question">
            What would you like me to do for you?
        </span>
        <div class="buttons">
            <button class="choice-button button-1" id="newPass">Get New Password</button>
            <button class="choice-button button-2" id="retrieve">Retrieve Password</button>
        </div>
    `,
    newPasswordContent: `
        <div class="back" id="back">Home</div>
        <div class="use">
            <span class="usename">
                What site or app is the password for?
            </span>
            <input type="text" name="usename" id="useName" placeholder="site/app name" autofocus>
            <div class="usename-error" id="usenameError"></div>
        </div>
        <div class="pass-strength flex-col">
            <span>Choose you password strength</span>
            <select id="options" class="full-width">
                <option value="6">1</option>
                <option value="8">2</option>
                <option value="10">3</option>
                <option value="14" selected>4</option>
                <option value="16">5</option>
                <option value="18">6</option>
                <option value="20">7</option>
                <option value="24">8</option>
                <option value="26">9</option>
                <option value="28">10</option>
            </select>
        </div>
        <button class="button-large generate" id="generate">Generate Password</button>
        <div class="copy-pass flex hidden">
            <input class="password" id="genPass" disabled />
            <div class="copy" id="copy">copy</div>
        </div>
        <div class="copy-alert" id="activityAlert">
            <!-- *password copied* -->
        </div>
        <div class="save-it button-medium" id="save">
            save it!
        </div>
    `,
    retrievePasswordContent: `
    <div class="back" id="back">Home</div>
    <div class="q1-div flex-col">
        <span style="font-size: 20px; margin-top: 10%;">Oh nice, looking to get a password you set?</span>
        </div>
        <h1>I gotcha...</h1>
    <div class="q-div">
        <h3><center>What's the name of the site/app?</center></h3>
        <input type="text" name="usename" id="searchUseName" placeholder="site/app name" class="full-width" autofocus>
        <div id="seachUsenameError"></div>
    </div>
    <div class="find flex-col button-medium" id="find">
        Find
    </div>
    <div>
        <div id="noPasswordFound"></div>
        <div class="copy-pass flex hidden" id="foundPasswordContainer">
            <input class="password" id="foundPassword" disabled />
            <div class="copy" id="copied">copy</div>
        </div>
    </div>
    <div class="copy-alert" id="activityAlert">
        <!-- *password copied* -->
    </div>
    `
};


const setMainDiv = (content) => {
    mainDiv.innerHTML = content;
}


setMainDiv(contents.homeContent);

// Get the get new password button
const newPasswordButton = document.getElementById('newPass');
// Get the retrieve password button
const retrievePasswordButton = document.getElementById('retrieve');


if(newPasswordButton) {
    // When they click on the new password button
    newPasswordButton.addEventListener('click', () => {
        // Change the contents of the screen
        setMainDiv(contents.newPasswordContent);

        // When the user wants to go back
        const backButton = document.getElementById('back');
        backButton.addEventListener('click', () => {
            // setMainDiv(contents.homeContent);
            location.reload();
        });

        // Get the generate password button
        const generate = document.getElementById('generate');

        // When the user wants to generate a password
        generate.addEventListener('click', () => {
            // Get the value the user entered
            const useName = document.getElementById('useName').value;
            const strengthOptions = document.getElementById('options').value;

            
            if(useName) {
                // If there was an error warning then remove it
                const usenameErrorField = document.getElementById('usenameError');
                removeInputWarning(usenameErrorField);

                // Get the password field and set it to a password
                const passwordField = document.getElementById('genPass');
                const password = generatePassword(strengthOptions, useName);

                // Check if a password was returned
                if(password) {
                    // Make the password field visible
                    const passwordDiv = document.querySelector('.copy-pass');
                    makeVisible(passwordDiv);

                    // Actually set the value for the password
                    passwordField.value = password;

                    // Enable saving functionality
                    enableSaving(useName, password);
    
                    // Enable copying password
                    const inputPassword = document.getElementById("genPass");
                    const copyButton = document.getElementById("copy");
                    copyButton.addEventListener("click", () => {
                        copyPassword(inputPassword);
    
                        // When the user copies a password
                        clickAnimation(copyButton);
                        showActivityAlert("Copied");
                    });
                }


                

            }else {
                // The user prolly didn't enter a name for the site/app name
                // Send out an error message
                const usenameErrorField = document.getElementById('usenameError');
                displayInputWarning(usenameErrorField, "Please fill the required field");
            }
        });
    });
}


// Run this if and only if there is a retireve button
if(retrievePasswordButton){
    retrievePasswordButton.addEventListener("click", () => {
        // Set the maindiv to the retrieve password content div
        setMainDiv(contents.retrievePasswordContent);

        // When the user wants to go back
        const backButton = document.getElementById('back');
        backButton.addEventListener('click', () => {
            // setMainDiv(contents.homeContent);
            location.reload();
        });

        // Listen on the following buttons
        findPasswordButton = document.getElementById('find');
        findPasswordButton.addEventListener("click", () => {
            // When the user clicks the find button, there might not be a searchUseName to search on
            // Note: we don't want that to happen
            // Let's get the searchUseName input field for the content
            const inputField = document.getElementById("searchUseName");
            const usenameErrorField = document.getElementById("seachUsenameError");
            if(inputField.value) {
                // If there was an input error message, remove it
                removeInputWarning(usenameErrorField);
                // We need to get the name of the app/site the user wants the password to
                const useSearchName = document.getElementById("searchUseName").value;
                // Now seach for the password and pass it to a variable
                const foundPassword = searchForPassword(useSearchName);
                // The found password container
                const foundPasswordContainer = document.getElementById("foundPasswordContainer");
                // The password not found container
                const noPasswordDiv = document.getElementById("noPasswordFound");
                if(foundPassword) {
                    // In case there was a no password found error message displayed, hide it
                    hideElement(noPasswordDiv);
                    // Show the user the password that was found
                    const foundPasswordDiv = document.getElementById("foundPassword");
                    foundPasswordDiv.value = foundPassword;
                    // Get the found password container
                    makeVisible(foundPasswordContainer);

                    // Tell the user the password was found
                    showActivityAlert("Password found");

                    // When the user copies a password
                    const copyButton = document.getElementById("copied");
                    copyButton.addEventListener("click", () => {

                        // Copy the text
                        const copyText = document.getElementById("foundPassword");
                        copyPassword(copyText);
                        
                        
                        // Click animation
                        clickAnimation(copyButton);
                        showActivityAlert("Copied");
                    })
                }else {
                    // In case there was a password found and displayed, hide it
                    hideElement(foundPasswordContainer);
                    // No such password exist, tell the user that
                    const message = "No password for such app/site exist";
                    noPasswordDiv.innerText = message;
                    makeVisible(noPasswordDiv);
                    noPasswordDiv.style.backgroundColor = "red";
                    noPasswordDiv.style.padding = "10px";
                }
            }else {
                displayInputWarning(usenameErrorField, "Please fill the required field");
            }
        });
    });
}


// Function to make a hidden div visible
const makeVisible = (element) => {
    element.classList.remove('hidden');
    element.style.display = "flex";
}


// Funtion to make div hidden again
const hideElement = (element) => {
    element.classList.add('hidden');
    element.style.display = "none";
}


// Function to generate passwords based on the strength
const generatePassword = (strength, name) => {
    let newPassword = '';
    possibleCharacters = `qwertyuiopasdfghjklzxcvbnm1234567890!"#$%&'()*+-/<=>?][^{}\`|~`;
    for (let i = 0; i < strength; i++) {
        const char = strength[i];
        const randomChar = Math.floor(Math.random() * possibleCharacters.length);
        newPassword += possibleCharacters[randomChar];
    }

    // Check if the user is trying to create a password for the same app/site
    if(localStorage.getItem(name)) {
        const usenameErrorField = document.getElementById('usenameError');
        displayInputWarning(usenameErrorField, "A site/app with this name already exist!");
        return null;
    }else {
        // Now check if the password created already exist
        const storageValues = Object.entries(localStorage);
        for (let i = 0; i < storageValues.length; i++){
            const storageValue = storageValues[i][0];
            if(newPassword === localStorage.getItem(storageValue)){
                // Call the funtion again
                generatePassword(strength, name);
                return null;
            }else {
            }
        }
        return newPassword;
    }
}

// Function to display an input warning error
const displayInputWarning = (element, message) => {
    // The element was probably hidden, so now we should make it vissible
    element.style.display = "block";

    // Set it to the warning message
    element.innerText = `*${message}*`;

    // Change the text color to a danger color
    element.style.color = "red";
}

// Function to remove the input error warning
const removeInputWarning = (element) => {
    // Set the error message to empty just for extra measures
    element.innerText = "";

    // Then hide the error element
    element.style.display = "none";
}


// Funtion to enable saving
const enableSaving = (name, password) => {
    const saveButton = document.getElementById('save');
    saveButton.style.display = "flex";

    saveButton.addEventListener("click", () => {
        savePassword(name, password);
        showActivityAlert("Saved to device");
    });
}


// Function to save the password on the users device
const savePassword = (name, password) => {
    name = name.toLowerCase();
    localStorage.setItem(name, password);
}



// Funtion to search for a password
const searchForPassword = (usename) => {
    usename = usename.toLowerCase();
    const password = localStorage.getItem(usename);
    return password;
}


// Funtion to copy a password
const copyPassword = (field) => {
    // Here I noticed that a copy to clipboard feature does not work when the input is disabled or without an input field at all
    // But we want to implement the clipboard feature we need the input field but then we have to remove the disable constraints before attempting to copy the text within the input field
    field.disabled = false;

    // Now we copy the text to the clipboard by writing the following code block
    field.select();
    field.setSelectionRange(0, 99999);
    document.execCommand("copy");

    // Now we have to disable the input field so we won't have a enabled and editable iput text field
    field.disabled = true;
}

// When the user clicks on the copy button -- do a click animation
const clickAnimation = (element) => {
    element.style.transform = "scale(0.9)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 200);
}


// When the user copies or saves a password -- show a copy alert
const showActivityAlert = (message) => {
    const activityAlertArea = document.getElementById("activityAlert");

    // Make the activity area visibe and show message
    activityAlertArea.innerText = `*${message}*`;
    // Change the color to green
    activityAlertArea.style.color = "greenyellow";

    // Set a timeout to remove the text
    setTimeout(() => {
        activityAlertArea.innerText = "";
    }, 2000);
}
