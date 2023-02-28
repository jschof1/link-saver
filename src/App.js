import React, { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  font-size: 20px;
  font-family: Helvetica Neue;
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
        <input
          value={link}
          onChange={handleLinkChange}
          placeholder="Enter a link here..."
          onKeyPress={handleLinkEnter}
        />
      </span>
      <span style={{ display: hideLinkInput == false ? 'none' : 'flex' }}>
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="Enter a name for the link..."
          onKeyDown={handleEnter}
        />
      </span>
    </StyledNote>
  );
};

export default function App() {
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
