import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Badge
} from '@mui/material';
import {Delete, Edit, HdrPlusRounded} from "@mui/icons-material"; // Import Edit and Delete icons
import axios from 'axios';
import {admin} from "@/Pages/Admin/Styles/Styles";
import {useForm} from "@inertiajs/react";

export default function Maincontent({contactUs, user}) {

    console.log(contactUs)
    const [items, setItems] = useState(contactUs);
    const [promoType, setPromoType] = useState(''); // Initialize promoType state
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    const handleDeleteConfirmation = (item) => {
        setItemToDelete(item);
        setDeleteConfirmationOpen(true);
    };

    // Function to handle opening the edit form in the modal
    const handleEdit = (item) => {
        console.log(item.price);
        setData({
            ...data,
            'price': item.price,
            'code': item.code,
        })
        setItemToEdit(item.id);
        setEditFormOpen(true); // Open the edit form in the modal
    };


    const handleDeleteItem = async () => {

        destroy(route('admin.promo_codes.destroy', itemToDelete.id), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                setDeleteConfirmationOpen(false);
                setItems(props.products);
                reset();
                clearErrors();

            },
        });
    };


    return (
        <div>
           
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Email</b></TableCell>
                        <TableCell><b>Phone</b></TableCell>
                        <TableCell><b>Message</b></TableCell>
                        {/* <TableCell><b>Action</b></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contactUs && contactUs.length > 0 ? (
                        contactUs.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.message}</TableCell>
                                {/* <TableCell>
                                    <Delete onClick={() => handleDeleteConfirmation(item)}/>
                                </TableCell> */}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>No data available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Dialog open={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <div style={{display: "flex", justifyContent: "space-between", padding: "16px"}}>
                    <Button onClick={() => setDeleteConfirmationOpen(false)} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteItem} variant="contained" color="primary">
                        Delete
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}
