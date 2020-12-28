; (function () {
    /*HeaderFixed*/
    let headerPage = document.querySelector('.header-page');
    let sectionTop = document.querySelector('.section-top');
    let sectionTopHeight = sectionTop.clientHeight;
    let scrollPos = window.pageYOffset;
    checkScroll(scrollPos, sectionTopHeight); //если обновить в середине страницы , шапка может исчезнуть ,поэтому запускаем эту функцию сразу
    window.addEventListener("scroll", headerFixed);
    window.addEventListener("resize", headerFixed);
    function headerFixed() {
        let sectionTopHeight = sectionTop.clientHeight;
        let scrollPos = window.pageYOffset;
        checkScroll(scrollPos, sectionTopHeight);
    }
    function checkScroll(scrollPos, sectionTopHeight) {
        if (scrollPos > sectionTopHeight) {
            headerPage.classList.add("is-active");
        }
        else {
            headerPage.classList.remove("is-active");
        }
    }
    /*popup*/
    let body = document.querySelector('body');
    let btnMenu = document.querySelector('.btn-menu');
    let popupMenu = document.querySelector('.popup-menu');
    let popupOrder = document.querySelector('.popup-order');
    let popupThanks = document.querySelector('.popup-thanks');
    let popupError = document.querySelector('.popup-error');

    btnMenu.addEventListener('click', function () {
        popupMenu.classList.add('is-active');
        body.classList.add('no-scroll');
        if (popupMenu.classList.contains('is-active')) {
            body.addEventListener('keydown', function (e) {
                if (e.keyCode === 27) {
                    popupMenu.classList.remove('is-active');
                    body.classList.remove('no-scroll');
                }
            })
        }
    })


    body.addEventListener('click', function (a) {
        let target = a.target;
        if (target.classList.contains('popup__inner') || target.classList.contains('popup-close')) {
            popupMenu.classList.remove('is-active');
            popupOrder.classList.remove('is-active');
            popupThanks.classList.remove('is-active');
            popupError.classList.remove('is-active');
            body.classList.remove('no-scroll');
        }
        if (target.classList.contains('catalog-menu__btn')) {
            popupOrder.classList.add('is-active');
            body.classList.add('no-scroll');
            if (popupOrder.classList.contains('is-active')) {
                body.addEventListener('keydown', function (p) {
                    if (p.keyCode === 27) {
                        popupOrder.classList.remove('is-active');
                        body.classList.remove('no-scroll');
                    }
                })
            }
        }
    })
    /*scrol to*/
    body.addEventListener("click", function (event) {
        let targetW = event.target;
        dataBlock = targetW.getAttribute('data-scroll');
        if (dataBlock) {
            event.preventDefault();
            let dataClass = document.querySelector(`.` + dataBlock);
            /*let dataOffSet = dataClass.getBoundingClientRect().top; //расстояние до блока dataClass (отсчет от того места где находимся мы на странице)
            let scrollTop = window.pageYOffset; // расстояние от верха страницы 
            let dataScroll = dataOffSet + scrollTop;
            let headerPageHeight = headerPage.clientHeight;
            let windowScroll = window.scrollTo(0, dataScroll - headerPageHeight); // скрол от верха страницы к нужному значению
            */
            dataClass.scrollIntoView({
                behavior: 'smooth',

            })
        }
    })
    /*Catalog-filter*/
    let catalogItems = document.querySelectorAll('.catalog-menu__item');
    body.addEventListener('click', function (m) {
        let targetM = m.target;
        let filterValue = targetM.getAttribute('data-filter');
        if (targetM.classList.contains('section-catalog__btn')) {
            if (targetM.classList.contains('is-active')) {
                return;
            }
            else {
                let catalogBtnActive = document.querySelector('.section-catalog__btn.is-active');
                targetM.classList.add('is-active');
                catalogBtnActive.classList.remove('is-active');
            }
            if (filterValue === 'all') {
                for (j = 0; j < catalogItems.length; j++) {
                    let currentJ = catalogItems[j];
                    currentJ.classList.remove('catalog-menu__hidden-item');
                }
            }
            else {
                for (i = 0; i < catalogItems.length; i++) {
                    let current = catalogItems[i];
                    let categoryValue = current.getAttribute('data-category');

                    if (categoryValue != filterValue) {
                        current.classList.add('catalog-menu__hidden-item');
                    }
                    else {
                        current.classList.remove('catalog-menu__hidden-item');
                    }
                }
            }
        }
        let updateProductPrice = function (targetM, newPrice) {
            let activeProduct = targetM.parentElement.parentElement.parentElement.parentElement;
            let activeChildren = activeProduct.children;
            for (let a = 0; a < activeChildren.length; a++) {
                let currentChild = activeChildren[a];
                if (currentChild.classList.contains('catalog-menu__order')) {
                    let orderChildren = currentChild.children;
                    for (let b = 0; b < orderChildren.length; b++) {
                        let currentPriceChild = orderChildren[b];
                        if (currentPriceChild.classList.contains('catalog-menu__price')) {
                            currentPriceChild.textContent = newPrice;
                        }
                    }
                }
            }
        }
        let changeProductSize = function (targetM) {
            let newPrice = targetM.getAttribute('data-product-size-price');
            if (targetM.classList.contains('menu-size__btn.is-active')) {
                return;
            }
            else {
                let MenuSizeBtn = document.querySelectorAll('.menu-size__btn');
                for (let y = 0; y < MenuSizeBtn.length; y++) {
                    let currentMenuBtn = MenuSizeBtn[y];
                    if (currentMenuBtn.classList.contains('is-active')) {
                        currentMenuBtn.classList.remove('is-active');
                    }
                }
                targetM.classList.add('is-active');

            }
            updateProductPrice(targetM, newPrice);
        }
        let changeProductInfo = function (targetM) {
            let parentBtn = targetM.parentElement;
            let parentBtnChildren = parentBtn.children;
            let activeProduct = parentBtn.parentElement;
            let activeChildren = activeProduct.children;
            for (let k = 0; k < activeChildren.length; k++) {
                let currentChild = activeChildren[k];
                if (currentChild.classList.contains('catalog-menu__title')) {
                    currentChild.classList.add('is-active');
                }
                if (currentChild.classList.contains('catalog-menu__img')) {
                    currentChild.classList.add('is-active');
                }
            }
            for (let m = 0; m < parentBtnChildren.length; m++) {
                let currentBtnChild = parentBtnChildren[m];
                if (currentBtnChild.classList.contains('catalog-menu__price')) {
                    currentBtnChild.classList.add('is-active');
                }
            }

            let activeTitle = document.querySelector('.catalog-menu__title.is-active');
            let activePrice = document.querySelector('.catalog-menu__price.is-active');
            let activeImg = document.querySelector('.catalog-menu__img.is-active');
            let MenuSizeActiveBtn = document.querySelector('.menu-size__btn.is-active');
            if (MenuSizeActiveBtn == null) {
                SizeContent = "35см";
            }
            else {
                SizeContent = MenuSizeActiveBtn.textContent;
                MenuSizeActiveBtn.classList.remove('is-active');
            }
            let TitleContent = activeTitle.textContent;
            let PriceContent = activePrice.textContent;
            let ImgSrc = activeImg.getAttribute('src');


            let order = document.querySelector('.popup-order');
            order.querySelector('.order-info-title').setAttribute('value', TitleContent);
            order.querySelector('.order-info-price').setAttribute('value', PriceContent);
            order.querySelector('.order-info-size').setAttribute('value', SizeContent);

            order.querySelector('.order-product-title').textContent = TitleContent;
            order.querySelector('.order-product-price').textContent = PriceContent;
            order.querySelector('.popup-order__size').textContent = SizeContent;
            order.querySelector('.popup-order__img').setAttribute('src', ImgSrc);
        }
        if (targetM.classList.contains('menu-size__btn')) {
            changeProductSize(targetM)
        }
        if (targetM.classList.contains('catalog-menu__btn')) {
            let productTitle = document.querySelectorAll('.catalog-menu__title');
            let productPrice = document.querySelectorAll('.catalog-menu__price');
            let productImg = document.querySelectorAll('.catalog-menu__img');
            for (let n = 0; n < productTitle.length; n++) {
                let currentTitle = productTitle[n];
                if (currentTitle.classList.contains('is-active')) {
                    currentTitle.classList.remove('is-active');
                }
            }
            for (let t = 0; t < productPrice.length; t++) {
                let currentPrice = productPrice[t];
                if (currentPrice.classList.contains('is-active')) {
                    currentPrice.classList.remove('is-active');
                }
            }
            for (let w = 0; w < productImg.length; w++) {
                let currentImg = productImg[w];
                if (currentImg.classList.contains('is-active')) {
                    currentImg.classList.remove('is-active');
                }
            }
            changeProductInfo(targetM);
        }
    })

    /*Map*/
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [55.794887, 37.712812],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: '',
                balloonContent: 'г. Москва, Преображенская площадь, 8'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '../img/common/marker.svg',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            }),

            myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
                hintContent: 'Собственный значок метки с контентом',
                balloonContent: 'А эта — новогодняя',
                iconContent: '12'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: '../img/common/marker.svg',
                // Размеры метки.
                iconImageSize: [40, 60],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 15],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            });

        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemarkWithContent);
    });
    /*form*/
    let forms = document.querySelectorAll('.form-send');

    if (forms.length === 0) {
        return;
    }

    let serialize = function (form) {
        let formItems = form.querySelectorAll('input, select, textarea');
        let str = "";
        for (let i = 0; i < formItems.length; i += 1) {
            let formItem = formItems[i];
            let name = formItem.name; // имя у инпута (его писали в html) , имена у нас пицца , цена , размер , тел, адрес
            let value = formItem.value; // value у инпута , селекта и тд

            // name=value&name2=value2 - такой должен быть у нас вид , так как в php(16 строка) такой вид

            let separator = i === 0 ? '' : '&'; // если i = 0 , то separator = '' пустая строка , иначе separator = & (символ &)
            // то есть у 1 элемента будет пустая строка (у 1 элемента i = 0) , у последующих будет &
            if (value) {
                str += separator + name + '=' + value; // пицца = Салями(салями это value(170 строчка js)) , цена = 850 и тд.
            }
        }
        return str;
    }

    let formSend = function (form) {
        let data = serialize(form);
        // console.log(data); // пицца=Л-01&цена=920 ₽&размер=25см&Имя=уекен&Телефон=кенгш&Адрес=енг&Оплата=Оплата картой - это мы видем в консоли
        let xhr = new XMLHttpRequest(); //аякс запрос , позваляет делать http запрос к серверу без перезагрузки страницы
        let url = 'mail/mail.php'; //путь , куда идет запрос

        xhr.open('POST', url); // конфигурация запроса с методом пост , запрос по адресу mail.php
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //заголовки (иначе в письме не будет видна таблица с данными нашими)

        xhr.onload = function () { // получение ответа с сервера
            //console.log(xhr.response); //в консоль пишем данные из xhr , тело ответа сервера (тело php - данные из php)
            let submitPopup = document.querySelector('.popup-order');
            if (submitPopup.classList.contains('is-active')) {
                submitPopup.classList.remove('is-active')
            }
            if (xhr.response === 'success') {
                document.querySelector('.popup-thanks').classList.add('is-active');
            } else {
                document.querySelector('.popup-error').classList.add('is-active');
            }

            form.reset(); // сброс данных из полей формы (после отправки чтоб сбрасывались а не сохранялись)
        }

        xhr.send(data); // послали запрос
    };
    for (let i = 0; i < forms.length; i += 1) {
        forms[i].addEventListener('submit', function (e) {
            e.preventDefault();
            let form = e.currentTarget;
            formSend(form);
        });
    }









})();

