const form = document.querySelector("form");
const list = document.querySelector("ul");
const input = document.getElementById("input");
const newText = document.createElement("p");
let currencyValue = "";
let listObjects = [];
const selectAllInput = document.getElementById("selectAllInput");
const allElements = document.getElementById("allElements");
let isOpenEvent = false;

//Validação para ver se este item já existe na lista de compras.
function Validate(listObjects) {

    const object = listObjects.map(item => item.textContent);
    const validate = object.includes(currencyValue);

    return validate;
}

//Recarregamento da página

    window.addEventListener("beforeunload", (event) => {
        event.preventDefault();

        event.returnValue = "";

        handleDeleteAllProducts();

    })
        input.focus();

//Validação se input está com evento aberto. 
function isOpen(isOpenEvent) {
    return isOpenEvent;
}

//Envio do formulário
form.onsubmit = (event) => {
    event.preventDefault();

    if (isOpen(isOpenEvent) == true) {

        const footer = document.querySelector("footer");

        newText.textContent = "Salve antes de adicionar outro produto!";
        newText.style.margin = 0;

        footer.appendChild(newText);

        footer.classList.add("transitionError");

        setTimeout(() => {

            footer.classList.remove("transitionError");
            newText.textContent = "";

        }, 2000);

        footer.style.display = "flex";
        return;
    }

    //Validação de entrada de dados!
    if (input.value === "") {

        const footer = document.querySelector("footer");

        newText.textContent = "Digite 1 quantidade e 1 produto!";
        newText.style.margin = 0;

        footer.appendChild(newText);

        footer.classList.add("transitionError");

        setTimeout(() => {

            footer.classList.remove("transitionError");
            newText.textContent = "";

        }, 2000);

        footer.style.display = "flex";
        input.focus();

    } else if (input.value.length > 50) {

        const footer = document.querySelector("footer");

        newText.textContent = "Digite 1 quantidade e 1 produto menor!";
        newText.style.margin = 0;

        footer.appendChild(newText);

        footer.classList.add("transitionError");

        setTimeout(() => {

            footer.classList.remove("transitionError");
            newText.textContent = "";

        }, 2000);

        footer.style.display = "flex";
        input.focus();
    }

    else {

        const newItem = document.createElement("li");
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");
        const iconsDiv = document.createElement("div");
        const newIconTrash = document.createElement("i");
        const newIconPencil = document.createElement("i");

        /* Regex para deixar a primeira letra maiúscula*/

        const regex = /\D+/g;
        const regexNumber = /\d+/g;
        const replace = String(input.value.match(regex)).trim();
        const changes = replace.toString().toLowerCase();
        const firstCharacter = changes.charAt(0);
        const upperCharacter = firstCharacter.toString().toUpperCase();

        //Validação para ver se o usuário digita a quantidade.

        if (input.value.match(regexNumber) == null) {
            const footer = document.querySelector("footer");

            newText.textContent = "Digite uma quantidade em número!";
            newText.style.margin = 0;

            footer.appendChild(newText);

            footer.classList.add("transitionError");

            setTimeout(() => {

                footer.classList.remove("transitionError");
                newText.textContent = "";

            }, 2000);

            footer.style.display = "flex";
            return;
        }

        let newString = String(input.value.match(regexNumber) + " " + changes.replace(changes.charAt(0), upperCharacter));

        newInput.type = "checkbox";
        newInput.style.cursor = "pointer";

        newLabel.appendChild(newInput)

        let textNode = document.createTextNode(newString);

        newLabel.appendChild(textNode);
        newLabel.classList.add("newLabel");

        newItem.appendChild(newLabel);

        newIconPencil.classList.add("bi", "bi-pencil");

        //Adiciona input para editar o que foi digitado anteriormente.
        newIconPencil.onclick = (event) => {
            event.preventDefault();

            isOpen(event.isTrusted);

            newIconPencil.classList.add("icon-hidden");

            let newInputPencil = document.createElement("input");
            newInputPencil.classList.add("newInputPencil");

            newInputPencil.value = textNode.textContent;
            newLabel.removeChild(textNode);

            const save = document.createElement("button");
            save.setAttribute("alt", "Botão Salvar");
            save.textContent = "Salvar";
            save.classList.add("save");
        
            newLabel.append(newInputPencil, save);

            save.onclick = (event) => {
                event.preventDefault();

                isOpenEvent = false;

                isOpen(isOpenEvent);

                if (newInputPencil.value == "") {

                    const footer = document.querySelector("footer");

                    newText.textContent = "Digite 1 quantidade e 1 produto antes de salvar!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    footer.classList.add("transitionError");

                    setTimeout(() => {

                        footer.classList.remove("transitionError");
                        newText.textContent = "";

                    }, 2000);

                    footer.style.display = "flex";

                    return;
                }

                currencyValue = newInputPencil.value;

                const validate = Validate(listObjects);

                if (validate) {
                    const footer = document.querySelector("footer");

                    newText.textContent = "Este produto já existe na lista!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    footer.classList.add("transitionError");

                    setTimeout(() => {

                        footer.classList.remove("transitionError");
                        newText.textContent = "";

                    }, 2000);

                    footer.style.display = "flex";

                    return;
                }

                const regex = /\D+/g;
                const regexNumber = /\d+/g;
                const replace = String(newInputPencil.value.match(regex)).trim();
                const changes = replace.toString().toLowerCase();
                const firstCharacter = changes.charAt(0);
                const upperCharacter = firstCharacter.toString().toUpperCase();

                //Validação para ver se o usuário digita a quantidade.

                if (newInputPencil.value.match(regexNumber) == null) {
                    const footer = document.querySelector("footer");

                    newText.textContent = "Digite 1 quantidade e 1 produto!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    footer.classList.add("transitionError");

                    setTimeout(() => {

                        footer.classList.remove("transitionError");
                        newText.textContent = "";

                    }, 2000);

                    footer.style.display = "flex";
                    return;
                }

                let newString = newInputPencil.value.match(regexNumber) + " " + changes.replace(changes.charAt(0), upperCharacter);

                newLabel.removeChild(newInputPencil);
                newLabel.removeChild(save);

                textNode = document.createTextNode(newString);

                newLabel.appendChild(textNode);

                async function getProducts() {
                    const result = await Get("https://localhost:7172/api/Products/GetProducts");

                    return result;
                }

                async function handleUpdate() {
                    const products = await getProducts();

                    const findProduct = products.find(p => p.productId == newItem.dataset.productId);

                    const product = {

                        productID: findProduct.productId,
                        productName: newInputPencil.value, 
                        registrationDate: new Date(),

                    }
                        Put("https://localhost:7172/api/Products/UpdateProduct", product)
                }

                handleUpdate();

                const footer = document.querySelector("footer");

                newText.textContent = "Produto salvo com sucesso!";
                newIconPencil.classList.remove("icon-hidden");

                newText.style.margin = 0;

                footer.appendChild(newText);

                footer.classList.add("transitionSuccess");

                setTimeout(() => {
                    footer.classList.remove("transitionSuccess");
                    newText.textContent = "";
                }, 1000);

                input.focus();
            }
        }

        newIconTrash.classList.add("hgi", "hgi-stroke", "hgi-delete-02");

        iconsDiv.classList.add("divIcons");
        iconsDiv.append(newIconPencil, newIconTrash);

        newItem.append(iconsDiv);

        currencyValue = newString;

        const validate = Validate(listObjects);

        if (validate) {

            const footer = document.querySelector("footer");

            newText.textContent = "Este produto já existe na lista!";
            newText.style.margin = 0;

            footer.appendChild(newText);

            footer.classList.add("transitionError");

            setTimeout(() => {

                footer.classList.remove("transitionError");
                newText.textContent = "";

            }, 2000);

            footer.style.display = "flex";

            return;

        } else {

            //POST
            async function Post(url, body) {
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    })
                    if (!response.ok) throw new Error("Erro na requisição: " + response.statusText);

                    const data = await response.json();

                    newItem.dataset.productId = data.productId;

                    const ul = document.querySelector("ul");

                    ul.classList.remove("empty");
                    ul.classList.add("contains");

                    listObjects.push(newItem); //Adiciona o novo elemento na Lista de Arrays.
                    let listHeight = listObjects.length - 1;

                    //Adiciona o footer de item adicionado.
                    const footer = document.querySelector("footer");

                    newText.textContent = "Produto adicionado com sucesso!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    footer.classList.add("transitionSuccess");

                    footer.style.display = "flex";;

                    list.appendChild(newItem); //Adiciona o novo elemento à lista.

                    //Aplica uma transparência quando o elemento na lista passar de 5
                    if (listHeight >= 5) {
                        let transition = listObjects[listHeight];
                        transition.classList.add("transparent");

                        setTimeout(() => {
                            footer.classList.remove("transitionSuccess");
                            transition.classList.remove("transparent");
                            newText.textContent = "";
                        }, 1000);
                    }

                    setTimeout(() => {
                        footer.classList.remove("transitionSuccess");
                        newText.textContent = "";
                    }, 1000);

                    input.value = "";

                    const exportButton = document.getElementById("export");

                    exportButton.style.visibility = "visible";

                    //Adiciona visibilidade ao selecionar Todos e a Lixeira
                    const selectAll = document.getElementById("selectAll");
                    const allTrash = document.getElementById("allTrash");

                    allTrash.style.visibility = "visible";
                    selectAll.style.visibility = "visible";

                    setTimeout(() => {

                        footer.classList.remove("transitionSuccess");
                        newText.textContent = "";

                    }, 2000);

                    return data;

                } catch (error) {

                    if (listObjects.length == 0) {

                        noContent.style.visibility = "visible";
                        allTrash.style.visibility = "hidden";
                        selectAll.style.visibility = "hidden";

                    }

                    const footer = document.querySelector("footer");

                    newText.textContent = "Digite apenas 1 quantidade e 1 produto!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    footer.classList.add("transitionError");

                    setTimeout(() => {

                        footer.classList.remove("transitionError");
                        newText.textContent = "";

                    }, 2000);

                    footer.style.display = "flex";
                    input.focus();

                    return;
                }
            }

            const newProduct = {
                productID: 0,
                productName: newItem.textContent
            }

            Post("https://localhost:7172/api/Products/RegisterNewProduct", newProduct)

        };

        const exportButton = document.getElementById("export");

        exportButton.onclick = () => {

            const dialog = document.querySelector("dialog");
            const confirm = document.getElementById("yes");

            dialog.style.display = "flex";
            dialog.showModal();

            confirm.onclick = () => {

                exportToExcel()

                dialog.close();
                dialog.style.display = "none";

                listObjects.forEach(element => {

                    element.remove()

                    handleDeleteAllProducts();

                    const footer = document.querySelector("footer");

                    newText.textContent = "Produtos exportados com sucesso!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    newItem.classList.add("transparent");

                    footer.classList.add("transitionSuccess");

                    setTimeout(() => {
                        footer.classList.remove("transitionSuccess");
                        ul.classList.add("empty");
                        newText.textContent = "";
                    }, 1000);

                    //Reseta os itens da lista.
                    const index = listObjects.indexOf(element);
                    isOpenEvent = false;

                    if (index > -1) {
                        listObjects = []
                    }

                    const ul = document.querySelector("ul");
                    const exportButton = document.getElementById("export");

                    ul.classList.add("empty");
                    exportButton.style.visibility = "hidden";
                    selectAll.style.visibility = "hidden";
                    allElements.style.opacity = 0;
                    selectAllInput.checked = false;
                    noContent.style.visibility = "visible";

                    input.focus();
                })
            };

                const notConfirm = document.getElementById("no");

                notConfirm.onclick = () => {

                    const dialog = document.querySelector("dialog");

                    dialog.close();
                    dialog.style.display = "none";
                }

                return;
        }

        //Remove todos os itens da minha lista.
        allTrash.onclick = (event) => {

            if (selectAllInput.checked == false) {

                const footer = document.querySelector("footer");

                newText.textContent = "Clique em Selecionar todos!";
                newText.style.margin = 0;

                footer.appendChild(newText);

                footer.classList.add("transitionError");

                setTimeout(() => {

                    footer.classList.remove("transitionError");
                    newText.textContent = "";

                }, 1000)

            } else {

                listObjects.forEach(element => {

                    element.remove()        

                    handleDeleteAllProducts();

                    const footer = document.querySelector("footer");

                    newText.textContent = "Produtos removidos com sucesso!";
                    newText.style.margin = 0;

                    footer.appendChild(newText);

                    newItem.classList.add("transparent");

                    footer.classList.add("transitionSuccess");

                    setTimeout(() => {
                        footer.classList.remove("transitionSuccess");
                        ul.classList.add("empty");
                        newText.textContent = "";
                    }, 800);

                    //Reseta os itens da lista.
                    const index = listObjects.indexOf(element);
                    isOpenEvent = false;

                    if (index > -1) {
                        listObjects = []
                    }

                    const ul = document.querySelector("ul");
                    const exportButton = document.getElementById("export");

                    ul.classList.add("empty");
                    exportButton.style.visibility = "hidden";
                    selectAll.style.visibility = "hidden";
                    allElements.style.opacity = 0;
                    selectAllInput.checked = false;
                    noContent.style.visibility = "visible";
                    input.focus();
                });
            }
        };

        allElements.style.opacity = 1;

        //Remove o backcard "Sem itens adicionados".
        const noContent = document.getElementById("nocontent");

        noContent.style.visibility = "hidden";

        //Adiciona checked = true em todos os checkBoxes.
        selectAllInput.onclick = () => {
            const allObjects = document.querySelectorAll('input[type="checkbox"]')

            allObjects.forEach(element => {
                element.checked = selectAllInput.checked
            })
        }

        //Function para remover itens da lista.
        newIconTrash.onclick = () => {

            if (newInput.checked == false) {

                const footer = document.querySelector("footer");

                newText.textContent = "Selecione ao menos um produto!";
                newText.style.margin = 0;

                footer.appendChild(newText);

                footer.classList.add("transitionError");

                setTimeout(() => {

                    footer.classList.remove("transitionError");
                    newText.textContent = "";

                }, 1000);

                footer.style.display = "flex";

            } else {

                async function handleDeleteProduct() {
                    const products = await Get("https://localhost:7172/api/Products/GetProducts");

                    const findProduct = products.find(p => p.productId == newItem.dataset.productId);

                    Delete("https://localhost:7172/api/Products/DeleteProduct", findProduct.productId);
                        
                };

                handleDeleteProduct();

                const footer = document.querySelector("footer");

                newText.textContent = "Produto removido com sucesso!";
                newText.style.margin = 0;

                footer.appendChild(newText);

                newItem.classList.add("transparent");

                footer.classList.add("transitionSuccess");

                setTimeout(() => {
                    footer.classList.remove("transitionSuccess");
                    newItem.classList.remove("transparent");
                    newText.textContent = "";
                }, 1000);

                //Reseta os itens da lista.
                const index = listObjects.indexOf(newItem);

                if (index > -1) {
                    listObjects.splice(index, 1);
                }

                //Validação para quando não há elementos na lista.
                if (listObjects.length == 0) {

                    const ul = document.querySelector("ul");
                    const exportButton = document.getElementById("export");

                    ul.classList.add("empty");
                    exportButton.style.visibility = "hidden";
                    selectAll.style.visibility = "hidden";
                    allElements.style.opacity = 0;
                    selectAllInput.checked = false;
                    noContent.style.visibility = "visible";
                }

                //Aplica uma transparência quando o elemento na lista passar de 5
                let listHeight = listObjects.length - 1;

                if (listHeight >= 5) {
                    let transition = listObjects[listHeight];
                    transition.classList.add("transparent");

                    setTimeout(() => {
                        footer.classList.remove("transitionSuccess");
                        transition.classList.remove("transparent");
                        newText.textContent = "";
                    }, 500);
                }

                footer.style.display = "flex";
                newItem.remove();
                input.focus();
            }
        }
    }
};


//GetToExcel
async function exportToExcel() {
    try {
        const response = await fetch("https://localhost:7172/api/Products/GetAllProducts");

        if (!response.ok) throw new Error("Erro ao baixar o Excel!")

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "Products.xlsx";

        document.body.appendChild(link);

        link.click();
        link.remove();

    } catch (error) {

        console.error("Erro ao solicitar os dados: ", error);
    }

};

//PUT
async function Put(url, product) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error("Erro na requisição " + response.status);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro:", error);
    }
};
                
//GET
async function Get(url) {
    try {

        const response = await fetch(url);

        if (!response.ok)
            throw new Error("Erro ao buscar os dados!");

        const data = await response.json();

        return data;
    } catch (error) {

        console.error("Erro ao solicitar os dados: ", error);
    }
}

//DELETE

async function Delete(url, productId) {
    try {
        const response = await fetch(`${url}/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Erro na requisição " + response.status);
        }

    } catch (error) {

        console.error("Erro:", error);
    }

};

//DELETE ALL

async function DeleteAll(url) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        if (!response.ok) {

            throw new Error("Erro na requisição " + response.status);
        }

    } catch (error) {
        console.error("Erro:", error);
    }
};

//handleDeleteAll
async function handleDeleteAllProducts() {

    DeleteAll("https://localhost:7172/api/Products/DeleteAllProducts");

}