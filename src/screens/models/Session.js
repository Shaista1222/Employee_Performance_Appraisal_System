// Session.js
class Session {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }
}

export default Session;
