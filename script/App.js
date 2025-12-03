
let menu = document.getElementById("menu-bars");
let navbar = document.querySelector(".navbar");
let btnScrol =document.querySelector('.btn-scrol');

onscroll=function(){
    if(scrollY >=700){
        btnScrol.style.display="block"
    }else{
        btnScrol.style.display="none"   
    }
}
btnScrol.onclick=function(){
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// Start navbar And search-form
menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
};
 document.querySelector("#search-icon").onclick = () => {
    document.querySelector("#search-form").classList.toggle("active");
};
 document.querySelector("#close").onclick = () => {
    document.querySelector("#search-form").classList.remove("active");
};
//  End navbar And search-form
//  Start Slider
let slideIndex =1
function navslider(n){
    slider(slideIndex += n)
}
slider(slideIndex)
function slider(index){
    let itemSlider = document.getElementsByClassName("slide-item")
    if(index >itemSlider.length){slideIndex = 1}
    if(index < 1){slideIndex =itemSlider.length}
    
    for(var i =0;i<itemSlider.length;i++){
        itemSlider[i].style.display="none"
    }
    itemSlider[slideIndex-1].style.display="block"
}
//  End Slider
// Start Card
let iconCart =document.getElementById("card");
let body =document.querySelector("body");
let BtnClose =document.querySelector(".CartBtn .close");
let prodoctsListHTML =document.querySelector(".box-container");
let ListCartHTML =document.querySelector(".listCart");
let iconCartSpan =document.querySelector(".icon-cart span");

let Listprodocts=[];
let carts=[];

iconCart.addEventListener("click",()=>{
    body.classList.toggle("showCart")
});
BtnClose.addEventListener("click", ()=>{
    body.classList.toggle("showCart")
});

const addDataHTML=()=>{
    prodoctsListHTML.innerHTML="";
    if(Listprodocts.length>0){
        let Fragment=document.createDocumentFragment()
        Listprodocts.forEach(prodect=>{
            let newprodect=document.createElement("div")
            newprodect.classList.add("box");
            newprodect.dataset.id=prodect.id;
            newprodect.innerHTML=`
                <a href="#" class="fas fa-heart"></a>
                <a href="#" class="fas fa-eye"></a>
                <img src="${prodect.image}" alt="" />
                <h3 class="titel-fode">${prodect.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div>
                <span class="price">$${prodect.prise}</span>
                </div>
                <button class="btn">add to cart</button>
            `
            Fragment.appendChild(newprodect)
        })
        prodoctsListHTML.appendChild(Fragment)
    }
}


prodoctsListHTML.addEventListener("click",(event)=>{
    let positionclick = event.target;
    if(positionclick.classList.contains("btn")){
        let prodect_id=positionclick.parentElement.dataset.id;
        addToCart(prodect_id)
    }
})

const addToCart=(prodect_id)=>{
    let positionThisProdectCart= carts.findIndex((value)=>value.prodect_id==prodect_id)
    if(carts.length <= 0){
        carts=[{
            prodect_id:prodect_id,
            quantity:1
        }]
    }else if(positionThisProdectCart< 0){
        carts.push({
            prodect_id:prodect_id,
            quantity:1
        })
    }else{
        carts[positionThisProdectCart].quantity =carts[positionThisProdectCart].quantity +1
    }
    addCartToHTML()
    addToCartMemory()
}
const addToCartMemory =()=>{
    localStorage.setItem("cart",JSON.stringify(carts))
}



const addCartToHTML=()=>{
    ListCartHTML.innerHTML="";
    let totalQuantity=0;
    if(carts.length>0){
        carts.forEach(cart=>{
            totalQuantity =totalQuantity + cart.quantity;
            let nweCart=document.createElement("div")
            nweCart.classList.add("item");
            nweCart.dataset.id=cart.prodect_id
            let positionProdect=Listprodocts.findIndex((value)=>value.id==cart.prodect_id);
            let info=Listprodocts[positionProdect]
            nweCart.innerHTML=`
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                   $ ${info.prise * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><i class="fa-solid fa-chevron-left"></i></span>
                    <span>${cart.quantity}</span>
                    <span class="plus"><i class="fa-solid fa-chevron-right"></i></span>
                </div>
            `;
            ListCartHTML.appendChild(nweCart)
        })
    }
    iconCartSpan.innerText=totalQuantity
}

ListCartHTML.addEventListener("click",(event)=>{
    let positionClick= event.target;
    if(positionClick.classList.contains("minus")||positionClick.classList.contains("plus")){
        let prodect_id=positionClick.parentElement.parentElement.dataset.id;
        let type="minus";
        if(positionClick.classList.contains("plus")){
         type="plus";
        }
        changeQuantity(prodect_id,type)
    }
})

const changeQuantity=(prodect_id,type)=>{
    let positionItemCart= carts.findIndex((value)=>value.prodect_id==prodect_id);
    if(positionItemCart>= 0){
        switch (type) {
            case "plus":
                carts[positionItemCart].quantity=carts[positionItemCart].quantity + 1
                break;
            default:
                let valueChenge= carts[positionItemCart].quantity - 1
                if(valueChenge>0){
                    carts[positionItemCart].quantity =valueChenge
                }else{
                    carts.splice(positionItemCart,1)
                }
                break;
        }
    }
    addToCartMemory();
    addCartToHTML()
}

const intApp = () => {
    fetch("script/products.json")
    .then(response => response.json())
    .then(data =>{
        Listprodocts= data;
        addDataHTML()

        // get cart From Memory
        if(localStorage.getItem("cart")){
            carts= JSON.parse(localStorage.getItem("cart"))
            addCartToHTML()
        }
    })
}
intApp()







// check forem
document.getElementById("form").addEventListener("submit",function(e){
    e.preventDefault() ;
    let Yorname=document.getElementById("name").value.trim();
    let youNumber =document.getElementById("youNumber").value.trim();
    let foodName =document.getElementById("foodName").value.trim();
    let howManyOrders =document.getElementById("howManyOrders").value.trim();
    let datetimeLocal =document.getElementById("datetime-local").value.trim();
    let yourAddress =document.getElementById("yourAddress").value.trim();
    let yourMessage =document.getElementById("yourMessage").value.trim();
    let isvalid=true;
    document.getElementById("nameEror").style.display="none";
    document.getElementById("NumbernameEror").style.display="none";
    document.getElementById("foodNameEror").style.display="none";
    document.getElementById("how_musch").style.display="none";
    document.getElementById("dateEror").style.display="none";
    document.getElementById("addressEror").style.display="none";
    document.getElementById("messageEror").style.display="none";
    
    if(Yorname.length<3){
      document.getElementById("nameEror").style.display="block";
      isvalid=false
    }
    let phonepatren=/^(010||011||012)\d{8}$/;
    if(!phonepatren.test(youNumber)){
      document.getElementById("NumbernameEror").style.display="block";
      isvalid=false;
    }
    if(foodName.length< 5){
      document.getElementById("foodNameEror").style.display="block";
      isvalid=false;
    }
    if(howManyOrders<=0){
      document.getElementById("how_musch").style.display="block";
      isvalid=false;
    }
    if(yourAddress<10){
      document.getElementById("addressEror").style.display="block";
      isvalid=false;
    }
    if(yourMessage<10){
      document.getElementById("messageEror").style.display="block";
      isvalid=false;
    }
    if(!datetimeLocal){
      document.getElementById("dateEror").style.display="block";
      isvalid=false;
    }
    if(isvalid){
     document.getElementById("successMessage").style.display="block";
     document.getElementById("form").reset()
     setTimeout(() => {
      document.getElementById("successMessage").style.display="none";
     }, 3000);
    }
  
  })










