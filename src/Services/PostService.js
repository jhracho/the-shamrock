// service with operations for parse posts
import Parse from "parse";
import { getAuthorsForUser } from "./AuthorService";
import { isAuthed } from "./AuthService";

// create operation - new post
export const createPost = ({title, subtitle, text, likes, dislikes, authorObj}) => {
    console.log("creating post with text: ", text);
    const Post = Parse.Object.extend("Post");
    const post = new Post();
    post.set("title", title);
    post.set("subtitle", subtitle);
    post.set("text", text);
    post.set("likes", likes);
    post.set("dislikes", dislikes);
    post.set("author", authorObj);

    return post.save().then((result) => {
        return result;
    });
};

// edit operation - edit post by ID
export const editPost = (postId, title, subtitle, text, likes, dislikes, authorObj) => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    return query.get(postId.postId).then((post) => {
        post.set("title", title);
        post.set("subtitle", subtitle);
        post.set("text", text);
        post.set("likes", likes);
        post.set("dislikes", dislikes);
        post.set("author", authorObj);
        return post.save().then((result) => {
            console.log('result is', result);
            return result;
        });
    });
}

// edit operation - increase number of likes or dislikes on post, based on ID
export const likePost = (postId, like) => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    return query.get(postId).then((post) => {
        if (like === 1) {
            post.set("likes", post.get("likes") + 1);
        }
        else if (like === -1) {
            post.set("dislikes", post.get("dislikes") + 1);
        }
        return post.save().then((result) => {
            return result;
        });
    });
}

// read operation - get post by id
export const getPostById = (postId) => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author");
    return query.get(postId).then((result) => {
        return result;
    });
};

// read operation - get all posts
export const getAllPosts = () => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author");
    return query.find().then((results) => {
        return results;
    });
};

// read operation - get 5 most recent posts
export const getLatestPosts = () => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author");
    query.descending("createdAt");
    query.limit(5);
    return query.find().then((results) => {
        return results;
    });
};

// read operation - get 5 most liked posts
export const getTopPosts = () => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author");
    query.descending("likes");
    query.limit(5);
    return query.find().then((results) => {
        return results;
    });
};

// read operatoin - get all posts from the current user
export const getPostsCurrentUser = () => {
        if (isAuthed()) {
        return getAuthorsForUser().then((authors) => {
            const Post = Parse.Object.extend("Post");
            const query = new Parse.Query(Post);
            query.include("author");
            query.containedIn("author", authors);
            return query.find().then((results) => {
                return results;
            });
        }).catch((error) => {
            console.error(error.code + ": " + error.message);
            return;
        });
    } else {
        return;
    }
};

// read operation - check if post (via postId) is by current user
export const isPostEditableCurrentUser = (postId) => {
    return getAuthorsForUser().then((authors) => {
        const Post = Parse.Object.extend("Post");
        const query = new Parse.Query(Post);
        query.include("author");
        return query.get(postId).then((result) => {
            for (var i in authors) {
                if (authors[i].id === result.get("author").id) {
                    return true;
                }
            }
            return false;
        });
    });
};

// read operation - get all posts by a given author (via id)
export const getAllPostsByAuthor = (authorId) => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author");
    query.descending("createdAt");
    return query.find().then((results) => {
        const posts = [];
        // sort through results and only include those that are by the desired author
        for (var i in results) {
            if (results[i].get("author").id === authorId) {
                posts.push(results[i]);
            }
        }
        return posts;
    });
}

// read operation - get top 5 posts by a given author (via id)
export const getTopPostsByAuthor = (authorId) => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author");
    query.descending("likes");

    return query.find().then((results) => {
        const posts = [];
        // sort through results and only include those that are by the desired author
        for (var i in results) {
            if (results[i].get("author").id === authorId) {
                posts.push(results[i]);
            }
        }
        // ensure only top 5 posts are returned
        if (posts.length > 5){
            return posts.slice(0, 5);
        } else {
            return posts;
        }
    });
}

// delete operation - delete post by id
export const removePostById = (id) => {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    return query.get(id).then((post) => {
        post.destroy();
    });
};