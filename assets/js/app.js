/*
C = TREBOL
D = DIAMANTE
H = CORAZON 
S = ESPADAS
*/

//IMPLEMENTAMOS EL PATRON MODULO CON LA FUNCION AUTOEJECUTABLE;

const miModulo = (() => {
    'use strict';

    let baraja = [];
    const pintas = ['C', 'D', 'H', 'S'];
    const cartasEspeciales = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];

    //referencias al html

    const btnPedirCarta = document.querySelector('#btnPedirCarta');
    const btnDetenerJuego = document.querySelector('#btnDetenerJuego');
    const btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    const smalls = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas');



    const iniciarJuego = (numJugadores = 2) => {

        baraja= crearBaraja();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        smalls.forEach(elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedirCarta.disabled = false;
        btnDetenerJuego.disabled = false;


    };

    //FUNCION QUE CREA LA BARAJA
    const crearBaraja = () => {

        baraja = [];
        for (let i = 2; i <= 10; i++) {
            for (let pinta of pintas) {
                baraja.push(i + pinta);

            }
        }

        for (let pinta of pintas) {
            for (let cartaEspecial of cartasEspeciales) {

                baraja.push(cartaEspecial + pinta);

            }
        }

        return _.shuffle(baraja);

    }

    // FUNCION QUE OBTIENE UNA CARTA DE LA BARAJA Y ELIMINA ESTA

    const obtenerCarta = () => {

        /*
        for (let carta of baraja) {
            carta = carta;
            let posicion = baraja.indexOf(carta)//identificamos la posicion/indiice de la carta dentro del arreglo
            baraja.splice(posicion, 1);//eliminamos la carta mediante su posicion
            return carta;
        }
        */
        if (baraja.length === 0) {
            throw 'no hay cartas en la baraja'
        }

        return baraja.pop();
    }

    // FUNCION QUE DETERMNA EL VALOR DE  UNA CARTA DE LA BARAJA

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1) //se elimina el ultimo caracter del string
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    }

    //turno: 0 = primer jugador y el ultimo sera la cpu
    const sumarPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgcarta = document.createElement('img');
        imgcarta.src = `./assets/img/${carta}.png`;
        imgcarta.classList.add('carta');
        divCartasJugadores[turno].append(imgcarta);
        
    }

    const determinarGanador = ()=>{

        setTimeout(() => {

            const [puntosMinimos, puntosCpu] = puntosJugadores;

            if (puntosCpu === puntosMinimos) {

                alert("nadie gana!!!")
            } else if (puntosMinimos > 21) {
                alert("CPU gana!!!");

            } else if (puntosCpu > 21) {
                alert("Jugador gana!!!");
            } else {
                alert("CPU gana!!!");
            }


        }, 100);


    }

    //turno CPU
    const turnoCpu = (puntosMinimos) => {

        let puntosCpu = 0;
        do {

            const carta = obtenerCarta();
            puntosCpu = sumarPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosCpu < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    //eventos Listener

    btnPedirCarta.addEventListener('click', () => {

        const carta = obtenerCarta();
        const puntosJugador = sumarPuntos(carta, 0);

        crearCarta(carta, 0);


        ////////////////////////////////////////////////

        if (puntosJugador > 21) {

            console.warn('tienes mas que 21 perdiste');
            btnPedirCarta.disabled = true;
            btnDetenerJuego.disabled = true;
            turnoCpu(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('tienes 21, genial');
            btnPedirCarta.disabled = true;
            btnDetenerJuego.disabled = true;
            turnoCpu(puntosJugador);
        }


    })

    btnDetenerJuego.addEventListener('click', () => {

        btnPedirCarta.disabled = true;
        btnDetenerJuego.disabled = true;

        turnoCpu(puntosJugadores[0]);

    });

    // btnNuevoJuego.addEventListener('click', () => {

    // iniciarJuego();

    // });

    return{
        nuevoJuego: iniciarJuego
    };


})();