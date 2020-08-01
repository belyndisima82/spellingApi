
class Spelling {
    constructor(obj) {
        this.id = obj.id;
        this.destructured = obj.destructured;
        this.pronunciationUrl = obj.pronunciation_url;
    }
}

class Word {
    constructor(obj) {
        this.id = obj.id;
        this.word = obj.word;
        this.pronunciationUrl = obj.pronunciation_url;
    }
}

module.exports = {
    Spelling: Spelling,
    Word: Word
}