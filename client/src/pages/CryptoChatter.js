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

  useEffect(() => {
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
    fetchItems();
  },[]);

  function handleUpdateProject(updatedProject) {
    const updatedProjectsArray = chatters.map((chatter) => {
      return chatter.id === updatedProject.id ? updatedProject : chatter;
    });
    setChatters(updatedProjectsArray);
  }

  function addToWatchlist(chatter){
    const watchlist = {
      user_id: user.id,
      chatter_id: chatters.id
    }
  
    fetch('/watchlists',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(watchlist)
    })
    .then(res => res.json())
    .then(json =>{
      if(json.error) {setErrors(json.error)
    }else {
      history.push("/dashboard");
    }})
  }



function like (id) {
  const updateObj = {
    likes: chatters.likes + 1,
};
  fetch(`/likes/${id}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateObj),
  })
    .then((r) => r.json())
    // .then((updatedProject) => {
    //   handleUpdateProject(updatedProject);
    // }) 
}



  function toggleLike() {
      const updateObj = {
          likes: chatters.likes + 1,
      };

      setLiked(!liked)

      {!liked ? 
          fetch(`/likes/${id}/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateObj),
        })
          .then((r) => r.json())
          .then((updatedProject) => {
            handleUpdateProject(updatedProject);
          }) 
          :
          fetch(`/likes/${id}/unlike`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateObj),
            })
              .then((r) => r.json())
              .then((updatedProject) => {
                handleUpdateProject(updatedProject);
              });
          }
  }
  useEffect(() => {
    fetch("/chatters")
      .then((r) => r.json())
      .then(setChatters);
  }, []);

  return (
    <Wrapper>
      {chatters.length > 0 ? (
        chatters.map((chatter) => (
          <div key={chatter.id}>
            <Box>
              <h2>{chatter.headline}</h2>
              <p>
                <cite>By {chatter.user.username}</cite>
              </p>
              <ReactMarkdown>{chatter.chat}</ReactMarkdown>
              <button type='submit' class='likeBtn' onClick={like}>
                {!liked ? '♡' : '💙'}
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
