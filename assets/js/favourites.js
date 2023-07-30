export class GitHubUser {
  static async search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    const response = await fetch(endpoint)
    const { login, name, public_repos, followers } = await response.json()
    return {
      user: login,
      name,
      public_repos,
      followers,
    }
  }
}

export class Favourites {
  constructor(app) {
    this.app = document.querySelector(app)
    this.getEntries()
  }

  getEntries() {
    this.entries = JSON.parse(localStorage.getItem('@github-favourites:')) || []
  }

  deleteUser(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.user !== user.user,
    )
    this.entries = filteredEntries
    this.update()
  }
}

export class FavouritesView extends Favourites {
  constructor(app) {
    super(app)

    this.tbody = document.querySelector('table tbody')
    this.update()
    this.addGitHubUser()
  }

  addGitHubUser() {
    const form = this.app.querySelector('form')
    const input = this.app.querySelector('input')

    form.onsubmit = async (event) => {
      event.preventDefault()

      const user = await GitHubUser.search(input.value)

      this.entries.push(user)
      localStorage.setItem('@github-favourites:', JSON.stringify(this.entries))

      this.update()
      input.value = ''
    }
  }

  update() {
    this.cleanRows()

    this.entries.forEach((user) => {
      const row = this.createRow(
        user.user,
        user.name,
        user.public_repos,
        user.followers,
      )

      row.querySelector('.remove').onclick = () => {
        const isToBeDeleted = confirm(
          'Are you sure you wish to delete this user?',
        )

        if (isToBeDeleted) {
          this.deleteUser(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow(user, name, public_repos, followers) {
    const tableRow = document.createElement('tr')
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
            `

    return tableRow
  }

  cleanRows() {
    this.tbody.querySelectorAll('tr').forEach((row) => {
      row.remove()
    })
  }
}
