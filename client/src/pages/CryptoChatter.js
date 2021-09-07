import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import {useHistory} from "react-router";

function NewsForum() {
  const [chatters, setChatters] = useState([]);
  // const [liked, setLiked] = useState(false)
//   const {id} = chatters;


// let history = useHistory();

  
//   useEffect(() => {
//     function fetchItems(){
//       fetch("/chatters")
//       .then(res=>res.json())
//       .then(chatters => {
//         if(chatters.error){
//             history.push(`/`);
//           }else{
//             setChatters(chatters)
//           }
//       })
//     }
//     fetchItems();
//   },[]);

  // function toggleLike() {
  //     const updateObj = {
  //         likes: chatters.likes + 1,
  //     };

  //     setLiked(!liked)

  //     {!liked ? 
  //         fetch(`/chatters/${id}/like`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updateObj),
  //       })
  //         .then((r) => r.json())
  //         .then((console.log) 
  //         ) 
  //         :
  //         fetch(`/chatters/${id}/unlike`, {
  //             method: "PATCH",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(updateObj),
  //           })
  //             .then((r) => r.json())
  //             .then((console.log)
  //             );
  //         }
  // }
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
            </Box>
            <span>
              <br></br>
              {/* <button type='submit' class='likeBtn' onClick={toggleLike}>
                {!liked ? '♡' : '💙'}
              </button> */}
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
