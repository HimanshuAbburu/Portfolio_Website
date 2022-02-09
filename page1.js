const home = document.querySelector('#Home')
const project1 = document.querySelector('#project1')



home.addEventListener('click',() =>{
    console.log('Scrolling');
    window.scrollTo(0,0);
});

project1.addEventListener('click', () =>{
    console.log('Shifting');
    window.open('./page2.html');
    
})

function scrollToHome() {
}