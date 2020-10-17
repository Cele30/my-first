const pregledBtn = document.querySelector('.pregled');
const inputIme = document.querySelector('#ime');
const inputSostojki = document.querySelector('#sostojki');
const inputSlika = document.querySelector('#slika');
const inputPodgotovka = document.querySelector('#podgotovka');
const inputGolemina = document.querySelector('#golemina');
const inputVreme = document.querySelector('#vreme');
const kreirajBtn = document.querySelector('.kreiraj')

class Recept {
    constructor(ime,sostojki,slika,podgotovka,golemina,vreme){
        this.ime = ime;
        this.sostojki = sostojki;
        this.slika = slika;
        this.podgotovka = podgotovka;
        this.golemina = golemina;
        this.vreme = vreme;
    }
}
pregledBtn.addEventListener('click',async()=>{
    await clearRecipe();
    let nov = new Recept(inputIme.value,inputSostojki.value,inputSlika.value,inputPodgotovka.value,inputGolemina.value,inputVreme.value);
    console.log(nov)
    console.log(nov.sostojki)
    const html = 

    ` <div class="card">
    <div class="header">
        <img src="${nov.slika}" alt="">
    </div>
    <div class="text">
       <h3 class="food">
           ${nov.ime}
       </h3>
       <i class="fa fa-clock"> ${nov.vreme} Mins</i>
       <i class="fa fa-users"> ${nov.golemina} Лица </i>
    </div>
    <a href="#" class="btn">ПОВЕЌЕ</a>
 </div>`
document.querySelector('.frame').insertAdjacentHTML('afterbegin',html);
})

async function clearRecipe(){
    document.querySelector('.frame').innerHTML = '';
}

kreirajBtn.addEventListener('click', ()=>{
    let nov = new Recept(inputIme.value.toLowerCase(),inputSostojki.value,inputSlika.value,inputPodgotovka.value,inputGolemina.value,inputVreme.value);
    let arrRecepti;
    if(localStorage.getItem("myStorage") === null){
        arrRecepti = [];
    }else{
        arrRecepti = JSON.parse(localStorage.getItem("myStorage"));
    }
    arrRecepti.push(nov);
    localStorage.setItem('myStorage', JSON.stringify(arrRecepti));

    document.querySelector('.uspesno').style.visibility = 'visible';
    setTimeout(() => {
        document.querySelector('.uspesno').style.visibility = 'hidden'
    }, 2000);
})