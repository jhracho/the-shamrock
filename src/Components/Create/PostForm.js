import { createPost } from "../../Services/PostService";
import { getAuthorsForUser } from "../../Services/AuthorService";
import { useEffect, useState, Fragment } from "react";

const PostForm = () => {
    // declare state variables and onChange handlers for the form inputs
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [text, setText] = useState();
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState('');

    const onChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const onChangeSubtitle = (e) => {
        e.preventDefault();
        setSubtitle(e.target.value);
    }

    const onChangeText = (e) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const onChangeAuthor = (e) => {
        e.preventDefault();
        setAuthor(e.target.value);
    }

    // this function executes once, when the page is first loaded
    // this sets the authors array, as well as initializing author to the default (first element in authors)
    useEffect(() => {
        getAuthorsForUser().then((response) => {
            if (response.length === 0) {
                alert('No existing author objects - use form on profile to create one!');
                window.location.href = '/profile';
            }
            else {
                setAuthors(response);
                var authorName = response[0].get("displayname")
                setAuthor(authorName);
            }
          });
    }, []);

    const onClickHandler = () => {
        var likes = 0;
        var dislikes = 0;
        // find author object based on the selected name
        var authorObj = authors.find((a => a.get("displayname") === author));
        
        // when post is created successfully, notify user and navigate to home page
        createPost({title, subtitle, text, likes, dislikes, authorObj}).then((response) => {
            console.log(response.id);
            alert(title + ' was successfully created!');
            window.location.href = '/post/' + response.id;
        }).catch((error) => {
            console.error(error.code + ": " + error.message);
        });
    };

    return(
        <form>
            {authors.length > 0 && (       
            <Fragment>
                <p>Author</p>
                <select name='author-input' required='required' onChange={onChangeAuthor}>
                {authors.map(
                    (author, i) => (
                        <option key={i} value={author.author}>{author.get("displayname")}</option>
                    ))}
                </select>
            </Fragment>
            )}
            <p>Title</p>
            <input type='text' onChange={onChangeTitle} name='title-input' maxLength='50' required='required' placeholder='What should your post be called?'/>
            <p>Sub-Heading</p>
            <input type='text' onChange={onChangeSubtitle} name='heading-input' maxLength='100' required='required' placeholder='A one-line description of your post.'/>
            <p>Story</p>
            <textarea id='story-input' name='story-input' onChange={onChangeText} columns='20' rows='4' required='required' placeholder='Share your Story!'></textarea>
            <button type='button' onClick={onClickHandler} name='submit-button' id='submit-button'>Submit for Review!</button>
        </form>
    );
};

export default PostForm;