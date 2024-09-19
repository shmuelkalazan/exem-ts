const range1 :HTMLInputElement  = document.querySelector('.range_1')!
const display_range_1 :HTMLDivElement | null = document.querySelector('.display_range_1')
const display_range_1_text :HTMLParagraphElement |null = document.createElement('p')
display_range_1_text.textContent = range1?.value!
range1?.addEventListener('change',()=>{
    display_range_1_text.textContent = range1?.value!
})
display_range_1?.appendChild(display_range_1_text)

const range2 :HTMLInputElement = document.querySelector('.range_2')!
const display_range_2 :HTMLDivElement | null = document.querySelector('.display_range_2')
const display_range_2_text :HTMLParagraphElement |null = document.createElement('p')
display_range_2_text.textContent = range2?.value!
range2?.addEventListener('change',()=>{
    display_range_2_text.textContent = range2?.value!
})
display_range_2?.appendChild(display_range_2_text)

const range3 :HTMLInputElement  = document.querySelector('.range_3')!
const display_range_3 :HTMLDivElement | null = document.querySelector('.display_range_3')
const display_range_3_text :HTMLParagraphElement |null = document.createElement('p')
display_range_3_text.textContent = range3?.value!
range3?.addEventListener('change',()=>{
    display_range_3_text.textContent = range3?.value!
})
display_range_3?.appendChild(display_range_3_text)

const select_position :HTMLSelectElement  = document.querySelector('.select_position')!
const but_serch_player :HTMLButtonElement |null = document.querySelector('.but_serch_player')
but_serch_player?.addEventListener('click',()=>GetAllPlayersByFilter())
const table_players :HTMLTableElement = document.querySelector('.table_players')!
const list_table :HTMLDivElement |null = document.querySelector('.list_table')

const BASE_URL :string = 'https://nbaserver-q21u.onrender.com'
let allPlayers:Player[] = []; 



const GetAllPlayersByFilter = async  ():Promise<void> => {
    try {
        const res: Response = await fetch(`${BASE_URL}/api/filter`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },     
            body: JSON.stringify({
                position:select_position.value ,
                twoPercent :Number(range2.value),
                threePercent:Number(range3.value),
                points :Number(range1.value),
            })
        })        
        const data: Player = await res.json()
        allPlayers.push(data)
        allPlayers = allPlayers.flat()
        //console.log(allPlayers[0].playerName);
        DisplayAllPlayers(allPlayers)
    } catch (err) {
        alert(`Couldn't proccess your players`)
    }
}

const DisplayAllPlayers = (allPlayers:Player[]) => {
    console.log("in");
    //table_players.innerHTML = ""
    
    for(let player of allPlayers) {
        const tr :HTMLTableRowElement = document.createElement('tr')
        const td_name :HTMLTableCellElement = document.createElement('td')
        const td_position :HTMLTableCellElement = document.createElement('td')
        const td_points :HTMLTableCellElement = document.createElement('td')
        const td_fg :HTMLTableCellElement = document.createElement('td')
        const td_3p :HTMLTableCellElement = document.createElement('td')
        const td_action :HTMLTableCellElement = document.createElement('td') 
        const add_button :HTMLButtonElement = document.createElement('button')
        add_button.classList.add('add_button')
        add_button.textContent = `Add ${player.playerName} to current Team`
        //add_button.addEventListener('click' ,() => AddPlayerToMyTeam(player))
        td_name.textContent = player.playerName
        td_position.textContent = player.position
        td_points.textContent = player.points.toString()
        td_fg.textContent = player.twoPercent.toString()
        td_3p.textContent = player.threePercent.toString()
        td_action.appendChild(add_button)
        tr.appendChild(td_name)
        tr.appendChild(td_position)
        tr.appendChild(td_points)
        tr.appendChild(td_fg)
        tr.appendChild(td_3p)
        tr.appendChild(td_action)
        list_table?.appendChild(tr)
        //table_players.appendChild()
    }
     

   
}





interface Player{
    position :string
    twoPercent:number
    threePercent:number
    points:number
    playerName:string
}
