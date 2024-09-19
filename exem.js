"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const range1 = document.querySelector('.range_1');
const display_range_1 = document.querySelector('.display_range_1');
const display_range_1_text = document.createElement('p');
display_range_1_text.textContent = range1 === null || range1 === void 0 ? void 0 : range1.value;
range1 === null || range1 === void 0 ? void 0 : range1.addEventListener('change', () => {
    display_range_1_text.textContent = range1 === null || range1 === void 0 ? void 0 : range1.value;
});
display_range_1 === null || display_range_1 === void 0 ? void 0 : display_range_1.appendChild(display_range_1_text);
const range2 = document.querySelector('.range_2');
const display_range_2 = document.querySelector('.display_range_2');
const display_range_2_text = document.createElement('p');
display_range_2_text.textContent = range2 === null || range2 === void 0 ? void 0 : range2.value;
range2 === null || range2 === void 0 ? void 0 : range2.addEventListener('change', () => {
    display_range_2_text.textContent = range2 === null || range2 === void 0 ? void 0 : range2.value;
});
display_range_2 === null || display_range_2 === void 0 ? void 0 : display_range_2.appendChild(display_range_2_text);
const range3 = document.querySelector('.range_3');
const display_range_3 = document.querySelector('.display_range_3');
const display_range_3_text = document.createElement('p');
display_range_3_text.textContent = range3 === null || range3 === void 0 ? void 0 : range3.value;
range3 === null || range3 === void 0 ? void 0 : range3.addEventListener('change', () => {
    display_range_3_text.textContent = range3 === null || range3 === void 0 ? void 0 : range3.value;
});
display_range_3 === null || display_range_3 === void 0 ? void 0 : display_range_3.appendChild(display_range_3_text);
const select_position = document.querySelector('.select_position');
const but_serch_player = document.querySelector('.but_serch_player');
but_serch_player === null || but_serch_player === void 0 ? void 0 : but_serch_player.addEventListener('click', () => GetAllPlayersByFilter());
const table_players = document.querySelector('.table_players');
const list_table = document.querySelector('.list_table');
const BASE_URL = 'https://nbaserver-q21u.onrender.com';
let allPlayers = [];
const GetAllPlayersByFilter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}/api/filter`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                position: select_position.value,
                twoPercent: Number(range2.value),
                threePercent: Number(range3.value),
                points: Number(range1.value),
            })
        });
        const data = yield res.json();
        allPlayers.push(data);
        allPlayers = allPlayers.flat();
        //console.log(allPlayers[0].playerName);
        DisplayAllPlayers(allPlayers);
    }
    catch (err) {
        alert(`Couldn't proccess your players`);
    }
});
const DisplayAllPlayers = (allPlayers) => {
    console.log("in");
    //table_players.innerHTML = ""
    for (let player of allPlayers) {
        const tr = document.createElement('tr');
        const td_name = document.createElement('td');
        const td_position = document.createElement('td');
        const td_points = document.createElement('td');
        const td_fg = document.createElement('td');
        const td_3p = document.createElement('td');
        const td_action = document.createElement('td');
        const add_button = document.createElement('button');
        add_button.classList.add('add_button');
        add_button.textContent = `Add ${player.playerName} to current Team`;
        //add_button.addEventListener('click' ,() => AddPlayerToMyTeam(player))
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
        list_table === null || list_table === void 0 ? void 0 : list_table.appendChild(tr);
        //table_players.appendChild()
    }
};
