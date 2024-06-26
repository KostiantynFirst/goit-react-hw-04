import { useState } from "react";
import { toast } from "react-toastify";

import { SearchbarField, Header, Form, Button, Input, ButtonLabel} from "./SearchBar.styled"

const Searchbar = ({ onSubmit }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = e => {
        setSearchQuery(e.target.value.toLowerCase());
        
        if (isSubmitting) {
            setIsSubmitting(false);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
       
        if(searchQuery.trim() === "") {
            toast.error("Enter something");
            return;
        }
        setIsSubmitting(true);
        onSubmit(searchQuery);
        setSearchQuery('');
    }

    return (
        <SearchbarField>
            <Header>
                <Form onSubmit={handleSubmit}>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <Button type="submit" disabled={isSubmitting}>
                    <ButtonLabel>Search</ButtonLabel>
                </Button>
                </Form>
            </Header>
        </SearchbarField>
    )

}

export default Searchbar;