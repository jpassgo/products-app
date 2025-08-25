import * as React from "react";
import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Modal, TextField, Box, Fade} from "@mui/material";
import type { Product } from "./types/Product";

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

export default function ProductsPage() {

    const [products, setProducts] = useState<Array<Product>>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: ""
    })

    useEffect(() => {
       getProducts(); 
    }, [])
    
    return (
        <>
            <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid item>
                    <Typography variant="h5">Products</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => setModalOpen(true)}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2}>
                {products.map((product) => (
                    <Grid item sx={{ ml: 2, mr: "50%"}}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Product Name: {product.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(!modalOpen)}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description">                                    
                <Box sx={style}>
                    <TextField 
                        id="product-name" 
                        name="name"
                        label="Name" 
                        value={form.name}
                        variant="outlined" 
                        onChange={updateForm}
                    />                                                              
                    <Button variant="contained" disabled={!isFormComplete()} onClick={saveProduct}>
                        Save Product
                    </Button>
                </Box>                        
            </Modal>
        </>
    );

    function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
     }

    function isFormComplete(): boolean {
        return form.name !== "";
    }

    function getProducts() {
        fetch('http://localhost:8080/products', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw response
            }
            return response.json();
        })
        .then(response => setProducts(response as Array<Product>));
    }

    function saveProduct() {
        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(response => {
           if (!response.ok) {
                throw response
            }
            return response.json(); 
        })
        .then(() => setForm({
            name: ""        
        }));
        setModalOpen(!modalOpen);
    }
} 