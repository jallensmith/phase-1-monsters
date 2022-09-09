// When the DOM loads, the first 50 monsters should appear
// name, age, description ~
// if else statement to show first 50? then second 50?

document.addEventListener("DOMContentLoaded", (event) => {
    // console.log("Event:", event)
    event.preventDefault()
    fetchMonsters()
    createForm()

    document.querySelector('#monster-form').addEventListener('submit', (event) => {
        event.preventDefault()
        createMonsters(event)
        console.log(event)
    })
})


const monsterContainer = document.getElementById('monster-container')

const createForm = () => {
    let formContainer = document.querySelector('#create-monster')
    let form = document.createElement('form')
    form.id = 'monster-form'
    let input1 = document.createElement('input')
    let nameLabel = document.createElement('label')
    let input2 = document.createElement('input')
    let ageLabel = document.createElement('label')
    let input3 = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')

    button.innerText = 'Add!'
    h2.innerText = 'Create a Monstr!'
    nameLabel.innerText = 'Name'
    ageLabel.innerText = 'Age'
    descriptionLabel.innerText = 'Description'

    form.append(h2, nameLabel, input1, ageLabel, input2, descriptionLabel, input3, button)
    formContainer.append(form)

    // console.log(formContainer)
}


const fetchMonsters = () => {

    fetch('http://localhost:3000/monsters')
        .then(resp => resp.json())
        .then(monsterData => {
            console.log(monsterData)

            monsterData.forEach((monster) => {
                const card = document.createElement('div')
                const name = document.createElement('h4')
                const age = document.createElement('p')
                const description = document.createElement('p')

                name.innerText = monster.name
                age.innerText = `Age: ${monster.age}`
                description.innerText = `Biography: ${monster.description}`

                card.append(name, age, description)
                monsterContainer.append(card)

                // console.log(monsterContainer)
            })
        })
}


function createMonsters(event) {

    const [name, age, description] = event.target

    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            age: age.value,
            description: description.value
        })
    })
        .then(response => response.json())
        .then(response => console.log(response))
        // showMonster fxn would be in place of console.log();

    monsterContainer.innerHTML = ''
    name.value = ''
    age.value = ''
    description.value = ''

}