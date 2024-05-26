import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      setKeyword('');
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex align-items-center"
    style={{ marginLeft: "20px" }}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search ...'
        className='mr-sm-2 ml-sm-5'
        style={{
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    color: "white",
                    height: "45px",
                    borderRadius: "24px",
                    border: "2px solid #"
                  }}
                  
      >

      </Form.Control>
      <FaSearch style={{marginRight:"-30px"  , position:"relative"}}/>
      {/* <Button type='submit' variant="outline-primary" style={{ height: "30px" ,paddingBottom:'33px'  }}>
        Search
      </Button> */}
    </Form>
  );
};

export default SearchBox;
