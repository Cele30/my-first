const search = document.querySelector('.fa-search');
const input = document.querySelector('#search');
search.addEventListener('click',function(){   
      input.classList.toggle('dis');
});

document.querySelector('#recept').addEventListener('click',()=>{
  document.querySelector('.recipes').scrollIntoView();
})

document.querySelector('#kontakt').addEventListener('click',()=>{
  document.querySelector('.contact').scrollIntoView();
})

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')}`;
    }
    return title;
}


async function getRecipe(query) {
    const app_id = 'cf47f6df';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '940e31c889f5d776912c19b4e31c2750';
    try {

        const res = await fetch(`${proxy}https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${key}&to=21`); 
        const data = await res.json();
        console.log(data);
        const arr = data.hits;
        arr.forEach(element => {
            const html = 

                 ` <div class="card">
                 <div class="header">
                     <img src="${element.recipe.image}" alt="">
                 </div>
                 <div class="text">
                    <h3 class="food">
                        ${limitRecipeTitle(element.recipe.label)}
                    </h3>
                    <i class="fa fa-clock"> ${calcTotalTime(element.recipe.totalTime)} Mins</i>
                    <i class="fa fa-users"> Serves ${element.recipe.yield}</i>
                 </div>
                 <div class="buttons">
                 <a href="#${element.recipe.uri.slice(44)}" class="btn aas">Let's Cook!</a>
                 <i class="fa fa-trash aad"></i>
                 </div>
              </div>`
        
            document.querySelector('.row').insertAdjacentHTML('afterbegin',html);
            
        });
        clearLoader();
    }
    catch (error){
        console.log(error)
    }
}

const calcTotalTime = function(totaltime){
    var min = 10;
    var max = 30;
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    if(totaltime < 5)
    return random
    
    return totaltime
}

input.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        renderLoader(document.querySelector('.load'));
        await clearRecipe();
        getRecipe(input.value);
        input.value = '';
        document.querySelector('.recipes').scrollIntoView();
        // //await clearLoader();
    }
});

getRecipe("meat");
//clearLoader();

async function clearRecipe(){
    document.querySelector('.row').innerHTML = '';
}

const renderLoader = async parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('beforeend', loader);
};

const clearLoader = async () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
};


renderLoader(document.querySelector('.load'));



//-----Kategorii-------//
async function kategori(){
  document.querySelector('.recipes').scrollIntoView();
  renderLoader(document.querySelector('.load'));
  await clearRecipe();
}
document.querySelectorAll('.itemm').forEach(e =>{
  e.addEventListener('click',async()=>{
    if(e.classList.contains('fish')){
      kategori();
      getRecipe("fish");
    }
    else if(e.classList.contains('kokteli')){
      kategori();
      getRecipe("cocktails");
    }
    else if(e.classList.contains('jajca')){
      kategori();
      getRecipe("eggs");
    }
    else if(e.classList.contains('salati')){
      kategori();
      getRecipe("green salad");
    }
    else if(e.classList.contains('pasti')){
      kategori();
      getRecipe("pasta");
    }
    else if(e.classList.contains('pica')){
      kategori();
      getRecipe("pizza");
    }
  })
})

const renderLoaderTwo = async parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

document.querySelector('.playbtn').addEventListener('click', () =>{
    document.querySelector('#playvideo').style.visibility = 'visible';
    renderLoaderTwo(document.querySelector('#playvideo'));
    document.querySelector('#youtube').src = 'https://www.youtube.com/embed/gVgq_bSOH2U';
    setTimeout(() => {
        clearLoader();
    }, 500);
});
document.querySelector('.exitbtn').addEventListener('click',() =>{
    document.querySelector('#playvideo').style.visibility = 'hidden';

    document.querySelector('#youtube').src = '';
});

const creatIngredient = ingredient =>`
    <li>${ingredient.text}</li>
`;

async function getRecipeInfo(id) {
    const app_id = 'cf47f6df';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '940e31c889f5d776912c19b4e31c2750';
    try {

        const res = await fetch(`${proxy}https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${id}&app_id=${app_id}&app_key=${key}`); 
        const data = await res.json();
        console.log(data);
        data.forEach(element => {
            const recipeView = 

        `
        <div class="all__recipe">
        <i class="fas fa-times exit-info"></i>
          <div id="recipe__presentation">
            <img src="${element.image}" alt="">
            <br>
            <div class="circle">
            <div class="circle__recipe">
              <h2>${calcTotalTime(element.totalTime)}M</h2>
              <p>Time</p>
            </div>
            <div class="circle__recipe">
              <h2>${element.yield}</h2>
              <p>Serves</p>
            </div>
            </div>
          <br>
          <div class="description">
            <h1>${element.label}</h1>
            <br>
          </div>
      
        </div>
      
      <div class="content">
      
        <!-- Menu -->
        <ul class="tabs">
          <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Ingredients</a></li>
          <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Nutrition Facts</a></li>
          
        </ul>
      
          <div id="ingredients" class="tabcontent">
            <h2>Ingredients</h2>
            <p>Source:<a href=${element.url} target="_blank">${element.url.slice(0,40)}...</a></p>
            <hr>
            <ul>
             ${element.ingredients.map(el => creatIngredient(el)).join('')}
            </ul>
          </div>
      
          <div id="method" class="tabcontent">
            <h2>Nutrition Facts</h2>
            <hr>
            <ol>
                <li>Serving Size <span class="text-primary">${element.yield}</span></li>
                <li>Serving <span class="text-primary">${element.yield}</span></li>
                <li>Calories: <span class="text-primary right">${Math.ceil(element.calories)}</span></li>
                <li>Total Fat:<span class="text-primary right">${Math.ceil(element.totalWeight)}</span></li>
                <li>Cholesterol:<span class="text-primary right">${Math.ceil(element.totalNutrients.CHOLE.quantity)}mg</span></li>
                <li>Sodium:<span class="text-primary right">${Math.ceil(element.totalNutrients.NA.quantity)}mg</span></li>
                <li>Potassium: <span class="text-primary right">${Math.ceil(element.totalNutrients.K.quantity)}mg</span></li>
                <li>Total Carbohydrate:<span class="text-primary right">${Math.ceil(element.totalNutrients.CHOCDF.quantity)}g</span></li>
            </ol>
          </div>
        </div>
      </div>`
        
        infoRecept();
        document.querySelector('#recipe-info').insertAdjacentHTML('afterbegin',recipeView);
        clearLoader();
        });
}   
    catch (error){
        console.log(error)
    }
}



const controlRecipe = () =>{
    const id = window.location.hash.replace('#','');
    console.log(id);
    document.querySelector('#recipe-info').style.visibility = 'visible';

    if(id){
        renderLoader(document.querySelector('#recipe-info'));
        getRecipeInfo(id);
    }
}
window.addEventListener('hashchange',controlRecipe);

document.querySelector('.btnn').addEventListener('click',()=>{
    document.querySelector('.recipes').scrollIntoView();
})


const btnTop = document.getElementById("btntop");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
}
btnTop.addEventListener('click',()=>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})



const creatSosotjki = ingredient =>`
    <li>${ingredient}</li>
`;

const karti = document.querySelectorAll('.spec-karta');
karti.forEach(e =>{
    e.addEventListener('click',()=>{
        if(e.classList.contains('ckembe')){
            var http_baranje = new XMLHttpRequest();
            http_baranje.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
            var jsonObjekt = JSON.parse(this.responseText);
            const specijalitet = `<div class="all__recipe">
            <i class="fas fa-times exit-info"></i>
              <div id="recipe__presentation">
                <img src="./img/shkembe-chorba.jpg" alt="">
                <br>
                <div class="circle">
                <div class="circle__recipe">
                  <h2>1час</h2>
                  <p>Време</p>
                </div>
                <div class="circle__recipe">
                  <h2>1</h2>
                  <p>Порција</p>
                </div>
                </div>
              <br>
              <div class="description">
                <h1>${jsonObjekt[0].ime}</h1>
                <br>
              </div>
          
            </div>
          
          <div class="content">
          
            <!-- Menu -->
            <ul class="tabs">
              <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Сосотјки</a></li>
              <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Подготовка</a></li>
              
            </ul>
          
              <div id="ingredients" class="tabcontent">
                <h2>Сосотјки</h2>
                <hr>
                <ul>
                 ${jsonObjekt[0].sostojki.map(el => creatSosotjki(el)).join('')}
                </ul>
              </div>
          
              <div id="method" class="tabcontent">
                <h2>Подготовка</h2>
                <hr>
                ${jsonObjekt[0].podgotovka}
              </div>
            </div>
          </div>`
        specijalitetiInfo();
        document.querySelector('#specijaliteti').insertAdjacentHTML('afterbegin',specijalitet);
            }
        }
            http_baranje.open("GET", "specijaliteti.json", true);
            http_baranje.send();
        }
        else if(e.classList.contains('gravce')){
            var http_baranje = new XMLHttpRequest();
            http_baranje.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
            var jsonObjekt = JSON.parse(this.responseText);
            const specijalitet = `<div class="all__recipe">
            <i class="fas fa-times exit-info"></i>
              <div id="recipe__presentation">
                <img src="./img/tavcegrafce.jpg" alt="">
                <br>
                <div class="circle">
                <div class="circle__recipe">
                  <h2>90мин</h2>
                  <p>Време</p>
                </div>
                <div class="circle__recipe">
                  <h2>1</h2>
                  <p>Порциja</p>
                </div>
                </div>
              <br>
              <div class="description">
                <h1>${jsonObjekt[1].ime}</h1>
                <br>
              </div>
          
            </div>
          
          <div class="content">
          
            <!-- Menu -->
            <ul class="tabs">
              <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Сосотјки</a></li>
              <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Подготовка</a></li>
              
            </ul>
          
              <div id="ingredients" class="tabcontent">
                <h2>Сосотјки</h2>
                <hr>
                <ul>
                 ${jsonObjekt[1].sostojki.map(el => creatSosotjki(el)).join('')}
                </ul>
              </div>
          
              <div id="method" class="tabcontent">
                <h2>Подготовка</h2>
                <hr>
                ${jsonObjekt[1].podgotovka}
              </div>
            </div>
          </div>`
          specijalitetiInfo();
          document.querySelector('#specijaliteti').insertAdjacentHTML('afterbegin',specijalitet);
            }
        }
            http_baranje.open("GET", "specijaliteti.json", true);
            http_baranje.send();
        }
        else if(e.classList.contains('torta')){
            var http_baranje = new XMLHttpRequest();
            http_baranje.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
            var jsonObjekt = JSON.parse(this.responseText);
            const specijalitet = `<div class="all__recipe">
            <i class="fas fa-times exit-info"></i>
              <div id="recipe__presentation">
                <img src="./img/cokoladna-torta-so-puding-i-cokoladen-krem.jpg" alt="">
                <br>
                <div class="circle">
                <div class="circle__recipe">
                  <h2>1час</h2>
                  <p>Време</p>
                </div>
                <div class="circle__recipe">
                  <h2>10</h2>
                  <p>Парчиња</p>
                </div>
                </div>
              <br>
              <div class="description">
                <h1>${jsonObjekt[2].ime}</h1>
                <br>
              </div>
          
            </div>
          
          <div class="content">
          
            <!-- Menu -->
            <ul class="tabs">
              <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Сосотјки</a></li>
              <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Подготовка</a></li>
              
            </ul>
          
              <div id="ingredients" class="tabcontent">
                <h2>Сосотјки</h2>
                <hr>
                <ul>
                 ${jsonObjekt[2].sostojki.map(el => creatSosotjki(el)).join('')}
                </ul>
              </div>
          
              <div id="method" class="tabcontent">
                <h2>Подготовка</h2>
                <hr>
                ${jsonObjekt[2].podgotovka}
              </div>
            </div>
          </div>`
          specijalitetiInfo()
          document.querySelector('#specijaliteti').insertAdjacentHTML('afterbegin',specijalitet);
            }
        }
            http_baranje.open("GET", "specijaliteti.json", true);
            http_baranje.send();
        }
    })
})

function specijalitetiInfo(){
  document.querySelector('#specijaliteti').style.visibility = 'visible';
  setTimeout(() => {
      document.querySelector('.exit-info').addEventListener('click',()=>{
          document.querySelector('#specijaliteti').style.visibility = 'hidden';
          document.querySelector('#specijaliteti').innerHTML = '';
      })
  },500);
  setTimeout(() => {
    document.querySelector('#nutr-fact').addEventListener('click',()=>{
        document.querySelector('#ingredients').style.display = 'none';
        document.querySelector('#method').style.display = 'block';
    })
},500);
setTimeout(() => {
    document.querySelector('#defaultOpen').addEventListener('click',()=>{
        document.querySelector('#method').style.display = 'none';
        document.querySelector('#ingredients').style.display = 'block';
    })
},500);
}

function noviRecepti(){
  if(localStorage.getItem('myStorage') !== null){
  let recept = JSON.parse(localStorage.getItem('myStorage'));
   for(let i=recept.length-1; i>=0; i--){
     const htmlRecept = `<div class="card" style="width: 15rem;">
     <div class="header-najnovi" style="height: 120px;">
         <img src="${recept[i].slika}" alt="">
     </div>
     <div class="text">
        <h1 class="food" style="font-size: 15px;">
           ${recept[i].ime}
        </h1>
        <i class="fa fa-clock"> ${recept[i].vreme} Mins</i>
        <i class="fa fa-users"> Лица ${recept[i].golemina}</i>
        
     </div>
     <div class="buttons">
     <a href="javascript:void(0)" class="btn aas">Повеќе</a>
     <i class="fa fa-trash aad"> </i>
     </div>
  </div>`

  document.querySelector('.red').insertAdjacentHTML('afterbegin',htmlRecept);
   }
  }
}
noviRecepti();

setTimeout(() => {
  document.querySelectorAll('.aad').forEach(e =>{
    e.addEventListener('click',(e)=>{
      let arrRecepti;
      if(localStorage.getItem("myStorage") === null){
          arrRecepti = [];
      }else{
          arrRecepti = JSON.parse(localStorage.getItem("myStorage"));
      }
      const card = e.target.parentNode.parentNode;
      const imeRecept = card.children[1].innerText.replace(/\r\n/g,"\n").split("\n")[0].toLowerCase()
  
      arrRecepti.forEach((rec,index) =>{
        if(rec.ime == imeRecept)
          arrRecepti.splice(index,1)
      })
      localStorage.setItem('myStorage',JSON.stringify(arrRecepti))
      e.target.parentNode.parentNode.remove() 
    })
  })
  
}, 1000);

console.log(document.querySelectorAll('.aad'))

document.querySelectorAll('.aas').forEach(e =>{
  e.addEventListener('click',(e)=>{
    let arrRecepti;
    if(localStorage.getItem("myStorage") === null){
        arrRecepti = [];
    }else{
        arrRecepti = JSON.parse(localStorage.getItem("myStorage"));
    }
    const card = e.target.parentNode.parentNode;
    const imeRecept = card.children[1].innerText.replace(/\r\n/g,"\n").split("\n")[0].toLowerCase()
    console.log(imeRecept)
    arrRecepti.forEach((rec,index) =>{
      console.log(rec.ime === imeRecept)
      //console.log(rec.sostojki.replace( /\s/g, ' ').trim().split(" "))
      if(rec.ime == imeRecept){
      const novirecepti = 

      `
      <div class="all__recipe">
      <i class="fas fa-times exit-info"></i>
        <div id="recipe__presentation">
          <img src="${rec.slika}" alt="">
          <br>
          <div class="circle">
          <div class="circle__recipe">
            <h2>${rec.vreme}</h2>
            <p>Минути</p>
          </div>
          <div class="circle__recipe">
            <h2>${rec.golemina}</h2>
            <p>Лица</p>
          </div>
          </div>
        <br>
        <div class="description">
          <h1>${rec.ime.toUpperCase()}</h1>
          <br>
        </div>
    
      </div>
    
    <div class="content">
    
      <!-- Menu -->
      <ul class="tabs">
        <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Состојки</a></li>
        <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Подготовка</a></li>
        
      </ul>
    
        <div id="ingredients" class="tabcontent">
          <h2>Состојки</h2>
          <hr>
          <ul>
          ${rec.sostojki.replace(/\r\n/g,"\n").split("\n").map(el => creatSosotjki(el)).join('')}
          </ul>
        </div>
    
        <div id="method" class="tabcontent">
          <h2>Подготовка</h2>
          <hr>
            ${rec.podgotovka}
        </div>
      </div>
    </div>`
    infoRecept();
    document.querySelector('#recipe-info').insertAdjacentHTML('afterbegin',novirecepti);
      }
     })
  })
})



document.querySelector('.aasss').addEventListener('click',()=>{
    var http_baranje = new XMLHttpRequest();
    http_baranje.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
    var jsonObjekt = JSON.parse(this.responseText);
      const novirecepti = 
      `
      <div class="all__recipe">
      <i class="fas fa-times exit-info"></i>
        <div id="recipe__presentation">
          <img src="${jsonObjekt[3].slika}" alt="">
          <br>
          <div class="circle">
          <div class="circle__recipe">
            <h2>${jsonObjekt[3].vreme}</h2>
            <p>Минути</p>
          </div>
          <div class="circle__recipe">
            <h2>${jsonObjekt[3].golemina}</h2>
            <p>Лица</p>
          </div>
          </div>
        <br>
        <div class="description">
          <h1>${jsonObjekt[3].ime}</h1>
          <br>
        </div>
    
      </div>
    
    <div class="content">
    
      <!-- Menu -->
      <ul class="tabs">
        <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Состојки</a></li>
        <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Подготовка</a></li>
        
      </ul>
    
        <div id="ingredients" class="tabcontent">
          <h2>Состојки</h2>
          <hr>
          <ul>
          ${jsonObjekt[3].sostojki.map((sosotjka)=> creatSosotjki(sosotjka)).join('')}
          </ul>
        </div>
    
        <div id="method" class="tabcontent">
          <h2>Подготовка</h2>
          <hr>
          ${jsonObjekt[3].podgotovka}
        </div>
      </div>
    </div>`
    infoRecept();
    document.querySelector('#recipe-info').insertAdjacentHTML('afterbegin',novirecepti);
    }
  }
  http_baranje.open("GET", "specijaliteti.json", true);
  http_baranje.send();

      })

document.querySelector('.poveke').addEventListener('click',()=>{
    var http_baranje = new XMLHttpRequest();
    http_baranje.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
    var jsonObjekt = JSON.parse(this.responseText);
      const novirecepti = 
      `
      <div class="all__recipe">
      <i class="fas fa-times exit-info"></i>
        <div id="recipe__presentation">
          <img src="${jsonObjekt[4].slika}" alt="">
          <br>
          <div class="circle">
          <div class="circle__recipe">
            <h2>${jsonObjekt[4].vreme}</h2>
            <p>Минути</p>
          </div>
          <div class="circle__recipe">
            <h2>${jsonObjekt[4].golemina}</h2>
            <p>Лица</p>
          </div>
          </div>
        <br>
        <div class="description">
          <h1>${jsonObjekt[4].ime}</h1>
          <br>
        </div>
    
      </div>
    
    <div class="content">
    
      <!-- Menu -->
      <ul class="tabs">
        <li><a href="javascript:void(0)" class="tablinks" id="defaultOpen">Состојки</a></li>
        <li id="nutr-fact"><a href="javascript:void(0)" class="tablinks">Подготовка</a></li>
        
      </ul>
    
        <div id="ingredients" class="tabcontent">
          <h2>Состојки</h2>
          <hr>
          <ul>
          ${jsonObjekt[4].sostojki.map((sosotjka)=> creatSosotjki(sosotjka)).join('')}
          </ul>
        </div>
    
        <div id="method" class="tabcontent">
          <h2>Подготовка</h2>
          <hr>
          ${jsonObjekt[4].podgotovka}
        </div>
      </div>
    </div>`
    infoRecept();
    document.querySelector('#recipe-info').insertAdjacentHTML('afterbegin',novirecepti);
    }
  }
        http_baranje.open("GET", "specijaliteti.json", true);
  http_baranje.send();
})
 


function infoRecept(){
  document.querySelector('#recipe-info').style.visibility = 'visible';
    setTimeout(() => {
      document.querySelector('.exit-info').addEventListener('click',()=>{
          document.querySelector('#recipe-info').style.visibility = 'hidden';
          document.querySelector('#recipe-info').innerHTML = '';
      })
  },500);
  setTimeout(() => {
    document.querySelector('#nutr-fact').addEventListener('click',()=>{
        document.querySelector('#ingredients').style.display = 'none';
        document.querySelector('#method').style.display = 'block';
    })
},500);
setTimeout(() => {
    document.querySelector('#defaultOpen').addEventListener('click',()=>{
        document.querySelector('#method').style.display = 'none';
        document.querySelector('#ingredients').style.display = 'block';
    })
},500);
}