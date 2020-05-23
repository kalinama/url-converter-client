import React, {useCallback, useContext, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";
import {useMessage} from "../hooks/message.hook";

export const DetailPage = () => {
  const doneMessage = useMessage('green');
  const errorMessage = useMessage('red');
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  const deleteLink = useCallback(async () => {
    try {
      const linkDelete = await request(`/api/link/remove/${linkId}`, 'POST', null, {
        Authorization: `Bearer ${token}`
      });
      doneMessage(linkDelete.message);
      setLink(linkDelete);
    } catch (e) {
      errorMessage(e.message);
    }
  }, [token, request]);

  useEffect(() => {
    getLink()
  }, [getLink]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && link && <LinkCard link={ link } deleteLink={ deleteLink } /> }
    </>
  );
};