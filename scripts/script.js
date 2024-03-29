/**
 * Show user score in console
 * @param {number} score : user score
 * @param {number} nbWordProposed : Number of word proposed to the user
 */
function showResult(score, nbWordProposed) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = `${score} / ${nbWordProposed}` 
    // Put the text into the zone
    spanScore.innerText = affichageScore
}

/**
 * Show word or sentence to user
 * @param {string} proposition 
 */
function showProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Construct email
 * @param {string} nom : user name 
 * @param {string} email : email to share score
 * @param {string} score : score
 */
function showEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Verify if name is valid
 * @param {string} nom 
 * @throws {Error}
 */
function validateName(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }
    
}

/**
 * Verify if email is valid
 * @param {string} email 
 * @throws {Error}
 */
function validateEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
    
}

/**
 * Show error message
 * @param {string} message 
 */
function showErrorMessage(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

/**
 * Get informations and create Email
 * @param {string} scoreEmail 
 */
function manageForm (scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validateName(nom)
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validateEmail(email)
        showErrorMessage("")
        showEmail(nom, email, scoreEmail)

    } catch(erreur) {
        showErrorMessage(erreur.message)
    }
    
}

/**
 *Launch the game and select between word or sentences
 */
function launchGame() {
    // Initialisation
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    showProposition(listeProposition[i])

    // Event on Valid button
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        showResult(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            showProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            showProposition(listeProposition[i])
        }
    })

    // Event on radio button
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                listeProposition = listePhrases
            }
            showProposition(listeProposition[i])
        })
    }

    // Submit event 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        manageForm(scoreEmail)
    })

    showResult(score, i)
}