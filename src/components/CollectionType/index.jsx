import React from 'react';
import './CollectionType.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '../../assets/icon-search-dark_2023-03-09/icon-search-dark.png';

const CollectionType = () => {
  const navigate = useNavigate();
  const [collectionList, setCollectionList] = useState([]);
  const makeRequest = async(url) =>{
    try {
       const result = await axios.get(url);
       return result;;
    }
    catch(e){
        throw new Error;
    }
  }
  useEffect(() => {
       makeRequest('http://localhost:8080/api/collection/getCollection')
      .then(async (response) => {

        setCollectionList(response.data.data);
      })
      .catch((e) => {
        console.log(e);
        }
      );
  }, []);

  console.log(typeof(collectionList));
  return (
    
    <>
      <div className="sidebar-header">
        <p>CMS+</p>
      </div>
      <div className='collection-header'>
        <div className='collection-types'>
          COLLECTION TYPES
        </div>
        <div className='search-icon'><img src={SearchIcon}></img></div>
      </div>
      <div className='collection-list'>
        { collectionList.length !== 0 ? 
          collectionList.map((collection, index) => {
            return (
              <ul  key={index}>
                <li className='collection-name'>{collection.name}</li>
              </ul>
            );
          }) : <></>
        }
        <div className='logo-text'>
       CONTENT TYPE BUILDER
        </div>
      </div>
    </>
  );

};

export default CollectionType;