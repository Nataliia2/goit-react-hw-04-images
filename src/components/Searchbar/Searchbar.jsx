import { useState } from 'react';
import { toast } from 'react-toastify';
import { Header, Form, Input, Button } from './Searchbar.style';

export default function Search({ onSubmit }) {
    const [searchName, setSearchName] = useState('');
   
    const hendleChangeInputSearch = (e) => {
        const { value } = e.target;
        setSearchName(value);
    }
    const hendleSubmitSearchForm = (e) => {
        e.preventDefault();
        if (searchName.trim() === '') {
            toast.warn("Enter your request, please!");
        }
        onSubmit(searchName);
         setSearchName('');
    }
    
        return (
        <Header>
            <Form onSubmit={hendleSubmitSearchForm}>                
                <Input
                onChange={hendleChangeInputSearch}
                name="searchName"
                value={searchName}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
                <Button type="submit" >
                    <span>Search</span>
                </Button>
            </Form>
        </Header>)
    }
