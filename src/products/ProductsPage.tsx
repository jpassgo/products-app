import * as React from "react";
import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Modal, TextField, Box } from "@mui/material";
import type { Product } from "./types/Product";
import ProductCard from "./components/ProductCard";


export default function ProductsPage() {

    const [products, setProducts] = useState<Array<Product>>(
        [{'title': 'hat1', 'description': 'This is a hat'}, 
            {'title': 'hat2', 'description': 'This is a hat'},
            {'title': 'ha3', 'description': 'This is a hat'}]);    
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: ""
    })

    useEffect(() => {
    //    getProducts();              
    }, [])

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

    const editProduct = (key: number, form: Product) => {
        fetch(`http://localhost:8080/products`,)
    }
    
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
                {products.map((product, index) => (
                    <Grid item sx={{ ml: 2, mr: "50%"}}>
                        <ProductCard key={index} title={product.title} description={product.description} editProduct={editProduct}></ProductCard>
                    </Grid>
                ))}
            </Grid>
        </>
    );
} 