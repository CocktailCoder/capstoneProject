import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function NewsForum() {
  const [chatters, setChatters] = useState([]);

  useEffect(() => {
    fetch("/chatters")
      .then((r) => r.json())
      .then(setChatters);
  }, []);

  return (
    <Wrapper>
      {chatters.length > 0 ? (
        chatters.map((chatter) => (
          <Recipe key={chatter.id}>
            <Box>
              <h2>{chatter.headline}</h2>
              <p>
                <cite>By {chatter.user.username}</cite>
              </p>
              <ReactMarkdown>{chatter.chat}</ReactMarkdown>
            </Box>
          </Recipe>
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
