class Favourites {
    constructor(app) {
        this.app = document.querySelector(app);
        this.getEntries();
    }

    getEntries() {
        this.entries = [
            {
                user: 'emidiovaleretto',
                name: 'Emidio Valeretto',
                public_repos: '86',
                followers: '35'
            },
            {
                user: 'maykbrito',
                name: 'Mayk Brito',
                public_repos: '76',
                followers: '120000'

            },
        ]
    }
}

export class FavouritesView extends Favourites {
    constructor(app) {
        super(app);

        this.tbody = document.querySelector("table tbody");
        this.update();
    }

    update() {
        this.cleanRows();

        this.entries.forEach(user => {

            const row = this.createRow(
                user.user,
                user.name,
                user.public_repos,
                user.followers
            )

            this.tbody.append(row)
        })
    }

    createRow(
        user,
        name,
        public_repos,
        followers
    ) {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
                <td class="github-user">
                    <img class="picture-profile" src="https://www.github.com/${user}.png" alt="${name}'s profile picture on GitHub">
                    <div class="github-user-details">
                        <a href="https://www.github.com/${user}" target="_blank">
                            <h2>${name}</h2>
                            <span>${user}</span>    
                        </a>
                    </div>
                </td>
                <td class="github-repositories">${public_repos}</td>
                <td class="github-followers">${followers}</td>
                <td>
                    <button class="remove">&times;</button>
                </td>
            `;

        return tableRow;
    }

    cleanRows() {

        this.tbody.querySelectorAll("tr").forEach((row) => {
            row.remove();
        });
    }
}
