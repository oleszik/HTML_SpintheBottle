document.addEventListener('DOMContentLoaded', () => {
    let players = {};

    function start() {
        addPlayer();
        spinBottle();
    }

    function spinBottle() {
        document.querySelector("#spin").addEventListener('click', () => {
            const status = document.querySelector('#status');
            status.innerHTML = 'Spinning...';
            // Promise를 반환하여 비동기 작업이 완료될 때까지 기다림
            return new Promise((resolve) => {
                setTimeout(() => {
                    twoSecondsLater();
                    resolve(); // 비동기 작업 완료 시 resolve 호출
                }, 2000);
            });
        });
    }

    function twoSecondsLater() {
        const status = document.querySelector('#status');
        const playerKeys = Object.keys(players);
        if (playerKeys.length > 0) {
            const randomIndex = Math.floor(Math.random() * playerKeys.length);
            const randomPlayer = players[playerKeys[randomIndex]];
            status.innerHTML = `Selected player: ${randomPlayer}`;
        } else {
            status.innerHTML = 'No players to select!';
        }
    }

    function addPlayer() {
        document.querySelector('#player-form').addEventListener('submit', (event) => {
            event.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지

            const input = document.querySelector('#player-name');
            const inputValue = input.value.trim();
            input.value = '';

            if (checkInputName(inputValue)) {
                const player = document.createElement('li');
                player.textContent = inputValue;
                document.querySelector('#players').appendChild(player);
                let length = Object.keys(players).length;
                players[length + 1] = inputValue;
                const status = document.querySelector('#status');
                status.innerHTML = 'Spin the bottle!';
            }
        });
    }

    function checkInputName(name) {
        if (name === '') {
            document.querySelector('#status').innerHTML = 'Name cannot be empty!';
            return false;
        }
        if (Object.values(players).includes(name)) {
            document.querySelector('#status').innerHTML = 'Player already exists!';
            return false;
        }
        return true;
    }

    start();
});