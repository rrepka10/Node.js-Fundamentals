// The first guitar id
let id = 1;

// Generate a new ID when we add an element
function newId() {
    return id++;
}

const guitars = [
    {id: newId(), make: 'Fender', model: 'Strat'},
    {id: newId(), make: 'PRS', model: 'Starla'},
    {id: newId(), make: 'Gibson', model: 'Les Paul'},
    {id: newId(), make: 'PRS', model: 'Vela'},
];

// Returns the guitars array
export const getGuitars = () => guitars;

// Save the guitars array
export function saveGuitar(guitar) {
    guitar.id = newId();
    guitars.push(guitar);
}

// Remove a guitar
export function deleteGuitar(id) {
    let index = guitars.findIndex(g => g.id == id);

    // TODO: check index

    guitars.splice(index, 1);
}

