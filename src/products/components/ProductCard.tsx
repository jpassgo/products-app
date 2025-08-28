import { Box, Button, Card, CardContent, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

type ProductCardProps = {
    key: number;
    title: string;
    description: string;
    editProduct: (key: number) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductCard({ key, title, description, editProduct }: ProductCardProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [form, setForm] = useState({
        title: "",
        description: ""
    })

    function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
     }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6">Title: {title}</Typography>
                    <Typography variant="h6">Description: {description}</Typography>
                    <Button onClick={() => setModalOpen(!modalOpen)}>Edit</Button>                    
                </CardContent>
            </Card>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(!modalOpen)}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description">                                    
                <Box sx={{style}}>
                    <TextField 
                        id="product-title" 
                        name="title"
                        label="Title" 
                        value={title}
                        variant="outlined" 
                        onChange={updateForm}
                    />                                                              
                    <TextField 
                        id="product-description" 
                        name="description"
                        label="Description" 
                        value={description}
                        variant="outlined" 
                        onChange={updateForm}
                    />
                    <Button variant="contained" onClick={() => editProduct(key, form)}>
                        Save Product
                    </Button>
                </Box>                        
            </Modal>
        </>
    )
}