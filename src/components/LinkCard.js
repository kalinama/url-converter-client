import React from "react";

export const LinkCard = ({ link, deleteLink }) => {
  return (
    <>
      <h2>Link <a onClick={() => deleteLink()} href="#">Delete</a></h2>

      <p>Your link: <a href={link.to} target="_blank" rel='noopener noreferrer'>{link.to}</a></p>
      <p className='details-links'>Where from link: <a href={link.from} target="_blank" rel='noopener noreferrer'>{link.from}</a></p>
      <p>Number of clicks on the link: <strong>{link.clicks}</strong></p>
      <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>

    </>
  )
};