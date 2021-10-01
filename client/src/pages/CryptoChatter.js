import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import {useHistory} from "react-router";

function NewsForum({user}) {
  const [chatters, setChatters] = useState([]);
  const [liked, setLiked] = useState(false)
  const [errors, setErrors] = useState([])
  const [watchlist, setWatchlist] = useState(false)
  const {id} = chatters;

let history = useHistory();

function fetchItems(){
  fetch("/chatters")
  .then(res=>res.json())
  .then(chatters => {
    if(chatters.error){
        history.push(`/`);
      }else{
        setChatters(chatters)
      }
  })
}
  useEffect(() => {

    fetchItems();
  },[]);

  function toggleLike(id) {
      const updateObj = {
          likes: chatters.likes + 1,
      };

      setLiked(!liked)
      const  chatter = chatters.find(ctr => ctr.id === id);
      console.log(chatter)
      if (chatter.likes.length === 0) { 
        fetch(`/likes/${id}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateObj),
        })
          .then((r) => r.json())
          .then((_resp) => {
            fetchItems();
          }) 
        } else {
          fetch(`/likes/${id}/unlike`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateObj),
            })
              .then((r) => r.json())
              .then((_resp) => {
                fetchItems();
              });
        }
  }
  // useEffect(() => {
  //   fetch("/chatters")
  //     .then((r) => r.json())
  //     .then(setChatters);
  // }, []);

  return (

    <Wrapper>
          <select>
        <option value="news">News</option>
        <option value="projects">Projects</option>
        <option value="jonbs">Jobs</option>
</select>
      {chatters.length > 0 ? (
        chatters.map((chatter) => (
          <div key={chatter.id + chatter.likes.length}>
            <Box>
              <h2>{chatter.headline}</h2>
              <p>
                <cite>By {chatter.user.username}</cite>
              </p>
              <ReactMarkdown>{chatter.chat}</ReactMarkdown>
              {/* <asdf key={}> */}
              <button type='submit' class='likeBtn' onClick={() => toggleLike(chatter.id)}>
                {chatter.likes.length !== 0 ? '💙' : '♡'}
              </button>
            </Box>
            <span>
              <br></br>

          </span>
          </div>
        ))
      
      ) : (
        <>
          <h2>No Chatter Found</h2>
          <Button as={Link} to="/newchatter">
            Make Some Noise!
          </Button>
        </>
      )}
        <Button as={Link} to="/newchatter">
            Add Some Chatter!
          </Button>
    </Wrapper>
    
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default NewsForum;

// function toggleLike() {
//   const updateObj = {
//       likes: chatters.likes + 1,
//   };

//   setLiked(!liked)

//   {!liked ? 
//       fetch(`/likes/${id}/like`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updateObj),
//     })
//       .then((r) => r.json())
//       .then((updatedProject) => {
//         handleUpdateProject(updatedProject);
//       }) 
//       :
//       fetch(`/likes/${id}/unlike`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updateObj),
//         })
//           .then((r) => r.json())
//           .then((updatedProject) => {
//             handleUpdateProject(updatedProject);
//           });
//       }
// }