import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

export const LinksTopList = ({ links }) => {
  const { token } = useContext(AuthContext);
  if (!links.length) {
    return <p className="center">No links yet <Link to='/auth'>Create</Link></p>;
  }
  const isAuthenticated = !!token;
  links.sort((a, b) => a.clicks > b.clicks ? -1 : 1);
  const linksArray = [];
  links.filter((a) => {
    if(linksArray.length <= 9) {
      linksArray.push(a);
    }
  });

  return (
    <table>
      <thead>
      <tr>
        <th>Top</th>
        <th>Origin link</th>
        <th>Shorter link</th>
        <th>Info</th>
      </tr>
      </thead>

      <tbody>
      { linksArray.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td className="table-links">{link.from}</td>
              <td>{link.to}</td>
              <td>
                {isAuthenticated && <Link to={`/detail/${link._id}`}>Open</Link>}
                {!isAuthenticated && <Link to='/auth'>Open</Link>}
              </td>
            </tr>
          )
      }) }
      </tbody>
    </table>
  )
};