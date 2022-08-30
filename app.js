// const baseURI = 'http://localhost:8080/api';
const baseURI = 'https://photo-payamd.herokuapp.com/api';

const fetchPhotos = async() => {
    const res = await fetch(`${baseURI}/photos`);
    const photos = await res.json();
    return photos;
}

const fetchAppendPhotos = async () => {

    const photos = await fetchPhotos();
    const items = await fetchTexts();

    const main = document.getElementById('main');

    main.before(createNavbar(items));
    main.append(createMain(photos));
    main.after(createFooter());
}

const fetchTexts = async() => {
    const res = await fetch(`${baseURI}/texts`);
    const texts = await res.json();
    return texts;
}

const about = (items) => {

    const aboutDiv = document.createElement('div');
    aboutDiv.classList.add('about-container');

    const title = document.createElement('h2');
    title.textContent = items[0].title;

    const aboutContent = document.createElement('p');
    aboutContent.textContent = items[0].about;

    const name = document.createElement('h2');
    name.textContent = items[0].name;

    const meImg = document.createElement('img');
    meImg.classList.add('me-img');
    meImg.src = items[0].imgUrl;

    const email = document.createElement('h5');
    email.textContent = items[0].email;

    const phone = document.createElement('h5');
    phone.textContent = items[0].phone;

    const home = document.createElement('a');
    home.id = 'home-link';
    home.href = items[0].homeUrl;
    home.text = 'payamd.com';
    home.target = 'blank';

    aboutDiv.appendChild(title);
    aboutDiv.appendChild(aboutContent);
    
    aboutDiv.appendChild(meImg);
    aboutDiv.appendChild(name);
    aboutDiv.appendChild(email);
    aboutDiv.appendChild(phone);
    aboutDiv.appendChild(home);

    return aboutDiv;
}

const overlayMenu = (items) => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    overlayContent.appendChild(about(items))

    const close = closeBtn();

    overlay.appendChild(close);
    overlay.appendChild(overlayContent);

    close.addEventListener('click', () => {
        overlay.classList.add('delay-1s');
        setTimeout(() => {
            document.getElementById('navId').removeChild(overlay);
        },1000)
    });

    return overlay;
}

const createNavbar = (items) => {

    const nav = document.createElement('nav');
    nav.classList.add('navbar','sticky-top','bg-sticky');
    nav.id = 'navId';

    const container = document.createElement('div');
    container.classList.add('container-fluid');

    const title = document.createElement('a');
    title.href = '#';
 
    title.classList.add('main-title');
    title.text = 'Photoasl';

    const openMenu = document.createElement('span');
    openMenu.innerHTML = "&#9776;";
    openMenu.classList.add('hamburger-menu');
    
    openMenu.addEventListener('click', () => { 
        nav.append(overlayMenu(items));
    })

    container.append(title);
    container.append(openMenu);
    nav.append(container);

    return nav;
}

const closeBtn = () => {

    const btn = document.createElement('button');
        btn.innerHTML = '<i class="bi bi-x"></i>';
        btn.classList.add('close-btn');
    return btn;
}


const unselect = () => {
    const photos = document.getElementsByClassName('img-card');
    for (let i = 0; i < photos.length; i++) {
        photos[i].classList.add('img-unselected');
        photos[i].classList.remove('img-selected');
    }
}

const captionDisplay = (text) => {

    const captionDiv = document.createElement('div');
    captionDiv.classList.add('bottom-left');

    const caption = document.createElement('p');
    caption.classList.add('photo-caption');

    caption.textContent = text;

    captionDiv.appendChild(caption);


    captionDiv.addEventListener('click', () => {
        captionDiv.removeChild(caption);
    });

    return captionDiv;
}

const photoDisplay = (url, alt) => {

    const imgRow = document.createElement('div');
    imgRow.classList.add('row','sticky-top','bg-sticky');

    const imgSlide = document.createElement('div');
    imgSlide.classList.add('img-container', 'col-12');

    const imgItem = document.createElement('img');
    imgItem.classList.add('img-show');

    imgItem.src = url;
    imgItem.alt = alt;

    

    const closeItem = document.createElement('div');
    closeItem.classList.add('bottom-right');

    const close = closeBtn();
    const caption = captionDisplay(alt);
    
   
    closeItem.appendChild(close);

    imgSlide.appendChild(imgItem);
    imgSlide.appendChild(caption);
    imgSlide.appendChild(closeItem);

    imgRow.appendChild(imgSlide);

    closeItem.addEventListener('click',()=>{
        imgSlide.classList.add('delay-1s');
        setTimeout(() => {
            imgSlide.removeChild(imgItem);
        },600)
    });
    
    return imgRow;
}


const createMain = (photos) => {

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('container-fluid');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

   
   let selectUrl = photos[0].url;
   let selectAlt = photos[0].text;

   let selectPhoto = photoDisplay(selectUrl, selectAlt); 
   
    photos.forEach(element => {

        const colDiv = document.createElement('div');
        colDiv.classList.add('col-sm-3', 'col-md-3', 'col-lg-2');


        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photos');

        const img = document.createElement('img');

        img.src = element.url;
        img.alt = element.text;

        img.classList.add('img-card');


        img.addEventListener('click', () => {
            
            unselect();
            img.classList.add('img-selected');
            mainDiv.removeChild(selectPhoto);

            selectUrl = element.url;
            selectAlt = element.text;  
            selectPhoto = photoDisplay(selectUrl, selectAlt); 

            mainDiv.appendChild(selectPhoto);   
            mainDiv.appendChild(rowDiv);      
        });

        photoDiv.append(img);
        colDiv.append(photoDiv);
       rowDiv.append(colDiv);
    });
    mainDiv.appendChild(selectPhoto);
    mainDiv.appendChild(rowDiv);

    return mainDiv;
}

const createFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = 'Designed by <a href="https://www.payamd.com/"> payamd.com </a> © 2022';
    return footer;
}

fetchAppendPhotos();
