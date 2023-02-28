import React, { useState } from 'react';
import './style.css'
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 10px;
  margin: 20px;
  width: 400px;
  font-size: 20px;
  font-family: Helvetica Neue;
`;

const BodyContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledNote = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  boxShadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const StyledLink = styled.a`
text-decoration: none;
color: inherit;
outline: 0;
padding: 10px;

`;

const StyledInput = styled.input`
border-top-style: hidden;
border-right-style: hidden;
border-left-style: hidden;
border-bottom-style: hidden;

`; 
const StyledCross = styled.div`
  font-size: 20px;
  padding: 10px;
`;

const LinkInput = ({ addLink }) => {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [hideLinkInput, setHideLinkInput] = useState(false);

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkEnter = (event) => {
    if (event.key === 'Enter') {
      setHideLinkInput(true);
    }
  };
  const handleEnter = (event) => {
    if (event.key === 'Enter' && link !== '' && name !== '') {
      addLink({ link, name });
      setHideLinkInput(false);
      setLink('');
      setName('');
    }
  };

  return (
    <StyledNote>
      <span style={{ display: hideLinkInput == true ? 'none' : 'flex' }}>
        <StyledInput
          value={link}
          onChange={handleLinkChange}
          placeholder="Enter your link..."
          onKeyPress={handleLinkEnter}
        />
      </span>
      <span style={{ display: hideLinkInput == false ? 'none' : 'flex' }}>
        <StyledInput
          value={name}
          onChange={handleNameChange}
          placeholder="Give it a name"
          onKeyDown={handleEnter}
        />
      </span>
      {/* <p onClick={handleEnter}> + </p> */}
    </StyledNote>
  );
};

export default function Pinboard() {
  const [links, setLinks] = useState([]);

  const addLink = (link) => {
    setLinks([...links, link]);
  };

  const deleteLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  return (
    <>
      <StyledContainer>
        {console.log(links)}
        {links.map((link, index) => (
          <StyledNote key={index}>
            <StyledLink
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </StyledLink>
            <StyledCross onClick={() => deleteLink(index)}>x</StyledCross>
          </StyledNote>
        ))}
        <LinkInput addLink={addLink} />
      </StyledContainer>
    </>
  );
}

export default function App() {
  const [numPinboards, setNumPinboards] = useState(1)
  const addPinboard = () =>{
   setNumPinboards(numPinboards + 1) 
  }

const pinboards = [];
for (let i = 1; i <= numPinboards; i++) {
  pinboards.push(<Pinboard key={i} />);
}
  return (
    <>
    <BodyContainer>
    {pinboards}
    <button onClick={addPinboard}>+</button>
    </BodyContainer>
    </>
  )
}
