const navbar = () => {
  return `
    <div>
        <div>
            <a href="/">Home</a>
        </div>
        <div>
            <a href="favourites.html">Favourites</a>
        </div>

    </div>
    `;
};

const nav = document.querySelector("nav");
nav.innerHTML = navbar();
