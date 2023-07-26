import React,{useState,useEffect} from 'react';
import {PopUpCard} from '../../components';
import { useNavigate } from 'react-router-dom';
import  makeRequestbackend  from '../../utils/makeRequestbackend';
import { GET_COLLECTION,ADD_FIELD,GET_ALL_CONTENT, DELETE_FIELD, EDIT_FIELD} from '../../constants/apiBackEndPoints';
import EditIcon from '../../assets/user-pencil-write-ui-education_2023-03-09/user-pencil-write-ui-education@2x.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './ContentBuilder.css';

const ContentBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState(0);
  const [fieldName, setFieldName] = useState('');
  const [fieldList, setFieldList] = useState([]);
  const [content, setContent] = useState({});
  const [collectionName, setcollectionName] = useState('');
  const [oldfield,setOldField] = useState('');
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };
  const navigate = useNavigate();
  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    makeRequestbackend(GET_COLLECTION, {}, navigate)
      .then(async (response) => {
        setCollectionList(response.data);
      })
      .catch((e) => {
        if (navigate) {
          const errorStatus = e.response?.status;
          if (errorStatus) {
            navigate(`error/${errorStatus}`);
          } else {
            navigate('error');
          }
        }
      });
  }, []);

  const SubmitField = () => {
    if(editId===0){
      makeRequestbackend(ADD_FIELD,
        {
          data: {
            id: content.id,
            field: fieldName,
            type: 'string'
          }
        }, 
        navigate)
        .then(async () => {
          const newList = [ ...fieldList, fieldName ];
          setFieldName('');
          setFieldList(newList);
          setToggle(false);
        })
        .catch((e) => {
          if (navigate) {
            const errorStatus = e.response?.status;
            if (errorStatus) {
              navigate(`error/${errorStatus}`);
            } else {
              navigate('error');
            }
          }
        });
    }
    else {
      makeRequestbackend(EDIT_FIELD,
        {
          data: {
            id: content.id,
            oldfield:oldfield,
            newfield:fieldName
          }
        },
        navigate)
        .then(async () => {
          let newList = [ ...fieldList, fieldName ];
          newList = newList.filter((item) => item !== oldfield);
          setFieldName('');
          setFieldList(newList);
          setToggle(false);
        })
        .catch((e) => {
          if (navigate) {
            const errorStatus = e.response?.status;
            if (errorStatus) {
              navigate(`error/${errorStatus}`);
            } else {
              navigate('error');
            }
          }
        });
    }

    
  };

  const handleFields = async(id) => {
    makeRequestbackend(GET_ALL_CONTENT,{},navigate)
      .then((response) => {

        const contents = response.data.find((item) => item.id === id);
        setContent(contents);
        setcollectionName(contents.name);
        if(contents.fields !== null)
          setFieldList(Object.keys(contents.fields));
        else
          setFieldList([]);
      })
      .catch((e) => {
        if (navigate) {
          const errorStatus = e.response?.status;
          if (errorStatus) {
            navigate(`error/${errorStatus}`);
          } else {
            navigate('error');
          }
        }
      });
  };
  const handleDelete = (field) => {
    makeRequestbackend(DELETE_FIELD,
      {
        data: {
          id: content.id,
          field: field
        }
      }, 
      navigate)
      .then(async () => {
        const newList = fieldList.filter((item) => item !== field);
        setFieldList(newList);
        setFieldName('');
        setToggle(false);
      })
      .catch((e) => {
        if (navigate) {
          const errorStatus = e.response?.status;
          if (errorStatus) {
            navigate(`error/${errorStatus}`);
          } else {
            navigate('error');
          }
        }
      });
  };
  const handleEdit = (field) => {
    
    const editTask = fieldList.find((item) => item === field);
    setOldField(editTask);
    setFieldName(editTask);
    setToggle(true);
    setEditId(1);

  };

  
  
  return (
    <div className='content-builder'>
      <div  className="header">
        Content Types
      </div>
      <div className='collection-types-builder'>
        <div className='types'>
          <button className='new-type-button' onClick={handleClick}>+ New Type</button>
          {isOpen && (
            <PopUpCard
              setIsOpen={setIsOpen} setContent={setContent} setcollectionName={setcollectionName}/>
          )}
          <div className='button-collection'>
            { collectionList.length !== 0 ? 
              collectionList.map((collection, index) => {
                return (
                  <button onClick={()=>handleFields(collection.id)} className='new-type-button-collection' key={index}>
                    {collection.name}
                  </button>
                );
              }) : <></>
            }
          </div>
        </div>
        <div className='fields'>
          {collectionName !== '' && (<>
            <div className='sub-header'>
              <div className='sub-header-name'>{collectionName}</div>
              <div className='sub-header-img'><img src={EditIcon}></img></div>
            </div>
            <button className='new-field-button' onClick={handleSubmit}>Add another field</button> 
            {toggle ?<div><input placeholder='Field Name' value={fieldName} onChange={(e) => setFieldName(e.target.value)}></input><button onClick={SubmitField} >Add Field</button></div>: (<></>)}
            {fieldList.length === 0 ? (
              <></>
            ) : (
              fieldList.map((field,index) => {
                return (
                  <div className='fields-collection' key={index}>
                    <div>{field}</div>
                    <div>Text</div>
                    <div className='icons'>
                      <div>
                        <FontAwesomeIcon onClick={()=>handleEdit(field)} icon={faEdit} />
                      </div>
                      <div>
                        <FontAwesomeIcon onClick={()=>handleDelete(field)} icon={faTrash} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </>
          )}
        </div>
      </div>
    </div>
    
  );

};

export default ContentBuilder;