import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {Loader} from '../components/Loader';
import {LinksTopList} from "../components/LinksTopList";

export const LinksTopPage = () => {
  const [links, setLinks] = useState([]);
  const {loading, request} = useHttp();

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link/top', 'GET');
      setLinks(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      {!loading && <LinksTopList links={links} />}
    </>
  )
};