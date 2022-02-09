let localStorageArea = JSON.parse(localStorage.getItem('productStorage'));

// Récupération des données des produits du panier par leur id


async function getProductFromApi(productId) {
    const response = await fetch("http://localhost:3000/api/products/" + productId);
    const json = await response.json();
    return json;
}

// Pour chaque identifiants id on lance la fonction getProductFromApi
// On place la réponse de l'api dans un tableau  

async function getProductCard() {
    const productList = [];

    for (const p in localStorageArea) {
        const product = localStorageArea[p];
        const productFromApi = await getProductFromApi(product.productId);
        productList.push(productFromApi);
    }

    displayCart(productList);
    console.log('liste des produits', productList);
};

getProductCard();


// //Intégration dynamique des éléments dans le DOM

function displayCart(productList) {

    // Pour chaque objets dans l'array liste du panier
    // Si la couleur et l'id du produit sont les mêmes




    for (let item in productList) {

        const product = productList[item];
        const idProduct = productList[item]._id;

        // Insertion dynamique des éléments

        let cartItemArticle = document.createElement('article');
        document.getElementById('cart__items').appendChild(cartItemArticle);
        cartItemArticle.className = 'cart__item';
        cartItemArticle.setAttribute('data-id', idProduct);
        cartItemArticle.setAttribute('data-color', localStorageArea[item].colorChoice);

        let cartItemImgDiv = document.createElement('div');
        cartItemArticle.appendChild(cartItemImgDiv);
        cartItemImgDiv.className = 'cart__item__img';

        let imgItem = document.createElement('img')
        cartItemImgDiv.appendChild(imgItem);
        imgItem.src = product.imageUrl;
        imgItem.alt = product.altTxt;

        let cartItemContentDiv = document.createElement('div');
        cartItemImgDiv.appendChild(cartItemContentDiv);
        cartItemContentDiv.className = 'cart__item__content';

        let cartItemContentDescriptionDiv = document.createElement('div');
        cartItemContentDiv.appendChild(cartItemContentDescriptionDiv);
        cartItemContentDescriptionDiv.className = 'cart__item__content__description';

        let productName = document.createElement('h2');
        cartItemContentDescriptionDiv.appendChild(productName);
        productName.textContent = product.name;

        let productColor = document.createElement('p');
        cartItemContentDescriptionDiv.appendChild(productColor);
        productColor.textContent = localStorageArea[item].colorChoice;

        let productPrice = document.createElement('p');
        cartItemContentDescriptionDiv.appendChild(productPrice);
        productPrice.textContent = product.price + ' €';

        let cardItemContentSettingsDiv = document.createElement('div');
        cardItemContentSettingsDiv.className = 'cart__item__content__settings';
        cartItemContentDiv.appendChild(cardItemContentSettingsDiv);

        let cartItemContentSettingsQuantityDiv = document.createElement('div');
        cartItemContentSettingsQuantityDiv.className = 'cart__item__content__settings__quantity';
        cardItemContentSettingsDiv.appendChild(cartItemContentSettingsQuantityDiv);

        let quantityProduct = document.createElement('p');
        cartItemContentSettingsQuantityDiv.appendChild(quantityProduct);
        quantityProduct.textContent = 'Qté : ';

        let InputModifyProduct = document.createElement('input');
        cartItemContentSettingsQuantityDiv.appendChild(InputModifyProduct);
        InputModifyProduct.className = 'itemQuantity';
        InputModifyProduct.setAttribute('type', 'number');
        InputModifyProduct.setAttribute('name', 'itemQuantity');
        InputModifyProduct.setAttribute('min', "1");
        InputModifyProduct.setAttribute('max', "100");
        InputModifyProduct.setAttribute('value', localStorageArea[item].quantityChoice);


        let cartItemContentSettingsDeleteDiv = document.createElement('div');
        cardItemContentSettingsDiv.appendChild(cartItemContentSettingsDeleteDiv);
        cartItemContentSettingsDeleteDiv.className = 'cart__item__content__settings__delete';

        let deleteItem = document.createElement('p');
        cartItemContentSettingsDeleteDiv.appendChild(deleteItem);
        deleteItem.textContent = 'Supprimer';

        // Au clic on suprime le produit dans le local storage

        deleteItem.addEventListener('click', (event) => {

            // On récupére l'id et la couleur du produit

            let id = cartItemArticle.dataset.id;
            let color = cartItemArticle.dataset.color;


            // On filtre les produits qui ne sont pas identique

            localStorageArea = localStorageArea.filter(el => el.productId !== id || el.colorChoice !== color);

            // On sauvegarde le résultat dans le local storage

            localStorage.setItem('productStorage', JSON.stringify(localStorageArea)),

                location.reload();
        })

    }

};