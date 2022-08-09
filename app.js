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
    nav.classList.add('navbar');
    nav.classList.add('sticky-top');

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

const selectPhoto = () => {

    const imgShow = document.createElement('div');
    imgShow.id = 'img-show';

    const main = document.getElementById('main');
    const img = document.createElement('img');

    img.addEventListener('click', () => {
        img.classList.toggle('img-selected');
        imgShow.append(img);
        main.before(imgShow);
    })
   
    return img;
}

const createMain = (photos) => {

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('container-fluid');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    photos.forEach(element => {

        const colDiv = document.createElement('div');
        colDiv.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');

        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photos');

        const img = selectPhoto();
        img.classList.add('img-card');
        img.src = element.url;
        img.alt = element.text;
        
        photoDiv.append(img);
        colDiv.append(photoDiv);
       rowDiv.append(colDiv);
    });

    
    mainDiv.append(rowDiv);
    return mainDiv;
}

const createFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = 'Designed by <a href="https://www.payamd.com/"> payamd.com </a> © 2022';
    return footer;
}

fetchAppendPhotos();