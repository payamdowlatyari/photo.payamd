const baseURI = 'http://localhost:8080/api';

const fetchPhotos = async() => {

    const res = await fetch(`${baseURI}/photos`);
    const photos = await res.json();
    return photos;
}

const fetchAppendPhotos = async () => {

    const photos = await fetchPhotos();
    const main = document.getElementById('main');

    main.before(createNavbar());
    main.append(createMain(photos));
    main.after(createFooter());
}


const createNavbar = () => {

    const nav = document.createElement('nav');
    nav.classList.add('navbar','sticky-top','bg-sticky');

    const container = document.createElement('div');
    container.classList.add('container-fluid');

    const brand = document.createElement('a');
    brand.href = 'https://www.payamd.com/';
    brand.innerHTML = '<i class="bi bi-house-fill"></i>';

    const title = document.createElement('a');
    title.href = '#';
 
    title.classList.add('main-title');
    title.text = 'Photography as a Second Language';

    container.append(brand);
    container.append(title);
    nav.append(container);

    return nav;
}

const unselect = () => {

    const photos = document.getElementsByClassName('img-card');
    
    for (let i = 0; i < photos.length; i++) {
        photos[i].classList.add('img-unselected');
        photos[i].classList.remove('img-selected');
    }
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

    imgSlide.appendChild(imgItem);
    imgRow.appendChild(imgSlide);

    imgSlide.addEventListener('click',()=>{
        imgSlide.removeChild(imgItem);
    });
    
    return imgRow;
}


const createMain = (photos) => {

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('container-fluid');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

   
   let selectUrl = photos[0].url;
   let selectAlt = photos[0].alt;

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