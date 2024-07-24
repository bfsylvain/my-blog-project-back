class AbstractManager {
    constructor({collection}) {
        this.collection = collection;
    }

    create(element) {
        return element.save();
    }

    findAll() {
        return this.collection.find()
    }

    findById(id) {
        return this.collection.findById(id);
    }

    delete(id) {
        return this.collection.findByIdAndDelete(id);
    }
}

module.exports = AbstractManager;