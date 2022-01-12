class QuicklinksLocalStorage {
    constructor() {
        // if item by key `Quicklinks` is not defined JSON.parse return null, so I use `or empty array`
        this.QuicklinksList = JSON.parse(localStorage.getItem('Quicklinks')) || [];
    }

    // create link
    create(data) {
        data.token = this.token;
        this.QuicklinksList.push(data);
        localStorage.setItem('Quicklinks', JSON.stringify(this.QuicklinksList));
    }

    getIndexByToken(token) {
        for (let i = 0; i < this.QuicklinksList.length; i++) {
            if (this.QuicklinksList[i].token === token) {
                return i;
            }
        }
        return -1;
    }

    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    update(data) {
        let index = this.getIndexByToken(data.token);
        if (index !== -1) {
            this.QuicklinksList[index] = data;
            localStorage.setItem('Quicklinks', JSON.stringify(this.QuicklinksList));
        }
    }

    delete(data) {
        let index = this.getIndexByToken(data.token);
        if (index !== -1) {
            this.QuicklinksList.splice(index, 1);
            localStorage.setItem('Quicklinks', JSON.stringify(this.QuicklinksList));
        }
    }

}




const qlStorage = new QuicklinksLocalStorage();

const newLink = qlStorage.QuicklinksList;

const container = document.querySelector('#qlinks');
const template = document.querySelector('#links_template');

const createLinkForm = document.querySelector('#addNewLink_form');
const createLinkTitle = document.querySelector('#linkTittle');
const createLinkAddress = document.querySelector('#linkAddress');
const createLinkButton = document.querySelector('#addLinkBtn');

// const para = document.createElement("p");
// para.innerText = "Link list is empty!";
// para.setAttribute("id", "EmptyListText");
// para.setAttribute("class", "alert-heading text-capitalize text-center text-dark-lm text-light-dm");

function onCreateLink({ data }) {

    // var elementPara = document.getElementById("EmptyListText");
    // if (elementPara != null) {
    //     elementPara.parentNode.removeChild(elementPara);
    // }

    const clone = template.content.cloneNode(true);

    const link = clone.querySelector('.qlink__link');
    const image = clone.querySelector('.qlink__link img');
    const title = clone.querySelector('.qlink__link .link_title');
    const forSVG = clone.querySelector('#forSVG');
    const edit_btn = clone.querySelector('#edit_btn');
    const delete_btn = clone.querySelector('#delete_btn');

    var id = halfmoon.makeId(5);
    link.setAttribute("id", id);
    link.setAttribute("href", data.link);
    if (data.thereIsImage) {
        forSVG.remove();
        image.setAttribute("src", data.image);
    }
    else if (checkInternet()) {
        forSVG.remove();
        image.setAttribute("src", "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + data.link + "&size=64");
    }
    else {
        image.remove();
        forSVG.innerHTML = data.image
    }
    // alert(id);

    title.innerHTML = data.title;

    // toggleTaskStatusClass({
    //     checked: data.checked,
    //     task,
    //     title
    // });

    // checkbox.addEventListener('input', () => {
    //     data.checked = checkbox.checked;
    //     toggleTaskStatusClass({
    //         checked: data.checked,
    //         task,
    //         title
    //     });
    //     storage.update(data);
    // });

    // title.addEventListener('input', () => {
    //     data.value = title.innerHTML;
    //     storage.update(data);
    // });

    delete_btn.addEventListener('click', (e) => {
        e.preventDefault();
        qlStorage.delete(data);
        link.remove();
        (link == null || link == "") ? container.appendChild(para) : "";
        if (localStorage.getItem("Quicklinks") != null) {
            var arrayFromStroage = JSON.parse(localStorage.getItem("Quicklinks"));
            var arrayLength = arrayFromStroage.length;
            if (arrayLength >= 18) {
                $("#addNewLink_form").addClass("hidden");
                return false;
            }
            else {
                $("#addNewLink_form").removeClass("hidden");
            }
        }
    });

    container.appendChild(clone);

    if (localStorage.getItem("Quicklinks") != null) {
        var arrayFromStroage = JSON.parse(localStorage.getItem("Quicklinks"));
        var arrayLength = arrayFromStroage.length;
        if (arrayLength >= 18) {
            $("#addNewLink_form").addClass("hidden");
            return false;
        }
        else {
            $("#addNewLink_form").removeClass("hidden");
        }
    }
}

window.addEventListener('online', () =>
    newLink.forEach((data) => {
        onCreateLink({
            data
        });
    })
);

newLink.forEach((data) => {
    onCreateLink({
        data
    });
});

createLinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (localStorage.getItem("Quicklinks") != null) {
        var arrayFromStroage = JSON.parse(localStorage.getItem("Quicklinks"));
        var arrayLength = arrayFromStroage.length;
        if (arrayLength >= 18) {
            $("#addNewLink_form").addClass("hidden");
            return false;
        }
        else {
            $("#addNewLink_form").removeClass("hidden");
        }
    }
    const title = createLinkTitle.value;
    const link = createLinkAddress.value;
    let image = "";
    if (checkInternet()) {
        image = "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + createLinkAddress.value + "&size=64"
    } else {
        image = '<svg class="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }
    // console.log(image);
    if (title && link && image) {
        const data = {
            title,
            link,
            image,
            thereIsImage: checkInternet()
        };
        qlStorage.create(data);
        onCreateLink({
            data
        });
        createLinkForm.reset();
    }
});

function checkInternet() {
    return window.navigator.onLine
}