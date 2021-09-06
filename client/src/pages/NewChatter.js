import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewChatter({ user }) {
  const [headline, setHeadline] = useState("Whats Your Chatter About");
  const [chat, setChat] = useState(`Here's how you make chatter:
  
Ethereum hit $4000, will the trend continue?

  `);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/chatters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        headline,
        chat,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/chatter");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create A Chat</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="headline">Headline</Label>
            <Input
              type="text"
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="chat">Chat</Label>
            <Textarea
              id="chat"
              rows="5"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Send Chat"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{headline}</h1>
        <h4><i>{chat}</i></h4>
        <p>
          <cite>By {user.username}</cite>
        </p>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewChatter;
