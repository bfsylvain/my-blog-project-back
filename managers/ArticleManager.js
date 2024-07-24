const AbstractManager = require("./AbstractManager");
const articleModel = require("../models/article.model");
const { isFloatLocales } = require("validator");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ collection: articleModel });
  }

  addComment(articleId, comment) {
    return this.collection.findByIdAndUpdate(
      articleId,
      {
        $push: { comments: comment },
      },
      { new: true }
    );
  }

  addLiker(articleId, likerId) {
    return this.collection.findByIdAndUpdate(
      articleId,
      {
        $addToSet: { likers: likerId },
      },
      { new: true }
    );
  }

  removeLiker(articleId, likerId) {
    return this.collection.findByIdAndUpdate(
        articleId,
        {
          $pull: { likers: likerId },
        },
        { new: true }
      );  
  }
}

module.exports = ArticleManager;
