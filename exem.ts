//יצירת ולקיחת הערכים מדרישות החיפוש
const range1: HTMLInputElement = document.querySelector(".range_1")!;
const display_range_1: HTMLDivElement | null = document.querySelector(".display_range_1");
const display_range_1_text: HTMLParagraphElement | null = document.createElement("p");
display_range_1_text.textContent = range1?.value!;
range1?.addEventListener("change", () => {
  display_range_1_text.textContent = range1?.value!;
});
display_range_1?.appendChild(display_range_1_text);


const range2: HTMLInputElement = document.querySelector(".range_2")!;
const display_range_2: HTMLDivElement | null = document.querySelector(".display_range_2");
const display_range_2_text: HTMLParagraphElement | null = document.createElement("p");
display_range_2_text.textContent = range2?.value!;
range2?.addEventListener("change", () => {
  display_range_2_text.textContent = range2?.value!;
});
display_range_2?.appendChild(display_range_2_text);


const range3: HTMLInputElement = document.querySelector(".range_3")!;
const display_range_3: HTMLDivElement | null = document.querySelector(".display_range_3");
const display_range_3_text: HTMLParagraphElement | null = document.createElement("p");
display_range_3_text.textContent = range3?.value!;
range3?.addEventListener("change", () => {
  display_range_3_text.textContent = range3?.value!;
});
display_range_3?.appendChild(display_range_3_text);


const select_position: HTMLSelectElement = document.querySelector(".select_position")!;
const but_serch_player: HTMLButtonElement | null = document.querySelector(".but_serch_player");
but_serch_player?.addEventListener("click", () => GetAllPlayersByFilter());
const table_players: HTMLTableElement =
  document.querySelector(".table_players")!;
const list_table: HTMLTableElement = document.querySelector(".list_table")!;

//תפישת השחקנים של הקבוצה שלי
const my_players_pg: HTMLDivElement = document.querySelector(".my_players_pg")!;
const my_players_sg: HTMLDivElement = document.querySelector(".my_players_sg")!;
const my_players_sf: HTMLDivElement = document.querySelector(".my_players_sf")!;
const my_players_pf: HTMLDivElement = document.querySelector(".my_players_pf")!;
const my_players_c: HTMLDivElement = document.querySelector(".my_players_c")!;

const BASE_URL: string = "https://nbaserver-q21u.onrender.com";
//שמירת כל השחקנים שהתקבלו בתוצאת החיפוש
let allPlayers: Player[] | any[] = [];

//מביא את כל השחקנים שתואמים לתוצאות החיפוש
const GetAllPlayersByFilter = async (): Promise<void> => {
  try {
    const res: Response = await fetch(`${BASE_URL}/api/filter`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        position: select_position.value,
        twoPercent: Number(range2.value),
        threePercent: Number(range3.value),
        points: Number(range1.value),
      }),
    });
    const data: Player = await res.json();
    allPlayers = [data]
    allPlayers = allPlayers.flat()
    DisplayAllPlayers(allPlayers);
  } catch (err) {
    alert(`Couldn't proccess your players`);
  }
};
//מציג את כל השחקנים שהתקבלו בתוצאות החיפוש
const DisplayAllPlayers = (allPlayers: Player[]) => {
   list_table.innerHTML = "";
  for (let player of allPlayers) {
    let player_first_name: string = player.playerName.split(" ")[0];
    const tr: HTMLTableRowElement = document.createElement("tr");
    const td_name: HTMLElement = document.createElement("td");
    const td_position: HTMLElement = document.createElement("td");
    const td_points: HTMLElement = document.createElement("td");
    const td_fg: HTMLElement = document.createElement("td");
    const td_3p: HTMLElement = document.createElement("td");
    const td_action: HTMLElement = document.createElement("td");
    const add_button: HTMLElement = document.createElement("button");
    add_button.classList.add("add_button");
    add_button.textContent = `Add ${player_first_name} to current Team`;
    add_button.addEventListener("click", () => AddPlayerToMyTeam(player));
    td_name.textContent = player.playerName;
    td_position.textContent = player.position;
    td_points.textContent = player.points.toString();
    td_fg.textContent = player.twoPercent.toString();
    td_3p.textContent = player.threePercent.toString();
    td_action.appendChild(add_button);
    tr.appendChild(td_name);
    tr.appendChild(td_position);
    tr.appendChild(td_points);
    tr.appendChild(td_fg);
    tr.appendChild(td_3p);
    tr.appendChild(td_action);
    list_table?.appendChild(tr);
  }
};
// מוסיף שחקן חדש לקבוצה 
const AddPlayerToMyTeam = (player: Player) => {
  //יצירת כל האלמנטים של השחקן
  const position: HTMLParagraphElement = document.createElement("p");
  const name: HTMLParagraphElement = document.createElement("p")!;
  const threePercent: HTMLParagraphElement = document.createElement("p");
  const twoPercent: HTMLParagraphElement = document.createElement("p");
  const points: HTMLParagraphElement = document.createElement("p");
  position.classList.add('position_in_one_player')
  position.classList.add("in_one_player");
  name.classList.add("in_one_player");
  threePercent.classList.add("in_one_player");
  twoPercent.classList.add("in_one_player");
  points.classList.add("in_one_player");
  //השמת הערכים בשחקן החדש 
  name.textContent = player.playerName;
  threePercent.textContent = `three Percent: ${player.threePercent.toString()}%`;
  twoPercent.textContent = `two Percent: ${player.twoPercent.toString()}%`;
  points.textContent = `points: ${player.points.toString()}`;
  //השמת פוזישן לפי הפוזישן שהתקבל
  let check_position: HTMLDivElement = my_players_pg;
  switch (player.position) {
    case "PG":
      position.textContent = "Point Guard";
      my_players_pg.innerHTML = "";
      check_position = my_players_pg;
      break;
    case "SG":
      position.textContent = "Shooting Guard";
      my_players_sg.innerHTML = "";
      check_position = my_players_sg;
      break;
    case "SF":
      position.textContent = "Small Forward";
      my_players_sf.innerHTML = "";
      check_position = my_players_sf;
      break;
    case "PF":
      position.textContent = "Power Forward";
      my_players_pf.innerHTML = "";
      check_position = my_players_pf;
      break;
    case "C":
      position.textContent = "Center";
      my_players_c.innerHTML = "";
      check_position = my_players_c;
      break;
    default:
      position.textContent = "Point Guard";
      my_players_pg.innerHTML = "";
      check_position = my_players_pg;
      break;
  }
  check_position.appendChild(position);
  check_position.appendChild(name);
  check_position.appendChild(threePercent);
  check_position.appendChild(twoPercent);
  check_position.appendChild(points);
};
//מבנה השחקן
interface Player {
  position: string;
  twoPercent: number;
  threePercent: number;
  points: number;
  playerName: string;
}
