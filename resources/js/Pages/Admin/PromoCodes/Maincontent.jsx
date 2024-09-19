import React, {useState} from 'react';
import {
    Badge,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import {Delete, Edit, HdrPlusRounded} from "@mui/icons-material"; // Import Edit and Delete icons
import axios from 'axios';
import {admin} from "@/Pages/Admin/Styles/Styles";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Maincontent({promoCode, user}) {

    // console.log(user.roles[0].name)
    const [items, setItems] = useState(promoCode);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDialogOpen1, setDialogOpen1] = useState(false);
    const [isTypeDialogOpen, setTypeDialogOpen] = useState(false);
    const [promoType, setPromoType] = useState(''); // Initialize promoType state
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null); // Define the itemToEdit state variable

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

    const {data, setData, post, put, reset,clearErrors , delete: destroy, errors, processing, recentlySuccessful} = useForm({
        price: '',
        type: '',
        code: ''
    });
    const submit = (e) => {
        data.type = promoType;
        console.log(data.type);
        e.preventDefault();
        post(route('admin.promo_codes.store'),{
            preserveScroll: true,
                onSuccess: ({props}) => {
                    setDialogOpen(false);
                    setDialogOpen1(false);
                    data.price = '';
                    data.type = ''

            },
        });

    };

    const update = (e) => {
        e.preventDefault();

        put(route('admin.promo_codes.update', itemToEdit),{
            preserveScroll: true,
            onSuccess: ({props}) => {
                setEditFormOpen(false);
                data.price = '';
                data.type = ''

            },
        });
    };

    const handleDeleteItem = async () => {

        destroy(route('admin.promo_codes.destroy', itemToDelete.id), {
            preserveScroll: true,
            onSuccess: ({props}) => {
                setDeleteConfirmationOpen(false);
                setItems(props.products);
                reset();
                clearErrors();

            },
        });
    };

    const createWithoutPricePromoCode = () => {
        // Define the data you want to send in the POST request
        const postData = {
            type: 'without_price',

        };

        // Make a POST request to the 'admin/promo_codes' route
        axios.post(route('admin.promo_codes.store'), postData)
            .then(response => {
                // Handle the response if needed
                console.log('Promo code created successfully', response.data);
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error creating promo code', error);
            });

        // Close the dialog if needed
        setTypeDialogOpen(false);
    };


    return (
        <div>
            {
                user.roles[0].name === 'master_access' && (
                    <Button
                        style={{margin: '0 10px 20px'}}
                        variant="contained"
                        color="primary"
                        onClick={() => setTypeDialogOpen(true)}
                        startIcon={<HdrPlusRounded/>}
                    >
                        Add Promo Code
                    </Button>
                )
            }

            <br/>
            <Button
                style={{margin: '0 10px'}}
                variant="contained"
                color="primary"
                onClick={() => setPromoType('price')}
            >
                Show Price Promo Codes
            </Button>
            <Button
                style={{margin: '0 10px'}}
                variant="contained"
                color="primary"
                onClick={() => setPromoType('without_price')}
            >
                Show Without Price Promo Codes
            </Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Code</b></TableCell>
                        {promoType === 'without_price' && <TableCell><b>Rate</b></TableCell>}
                        {promoType === 'price' && <TableCell><b>PRICE</b></TableCell>}
                        {
                            user.roles[0].name === 'master_access' && (
                              <>
                                  <TableCell><b>LAST USE</b></TableCell>
                                  <TableCell><b>USED COUNT</b></TableCell>
                              </>
                            )
                        }

                        <TableCell><b>Action</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {promoCode && promoCode.length > 0 ? (
                        promoCode
                            .filter(item => promoType === 'price' ? item.type === 'price' : item.type === 'without_price')
                            .map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.code}</TableCell>
                                    {promoType === 'without_price' && <TableCell>{item.price}</TableCell>}
                                    {promoType === 'price' && <TableCell>{item.price}</TableCell>}
                                    {/*{promoType === 'price' && <TableCell><b>PRICE</b></TableCell>}*/}
                                    {
                                        user.roles[0].name === 'master_access' && (
                                           <>
                                               <TableCell>
                                                   {(item.used_at && item.used_at)}

                                               </TableCell>
                                               <TableCell>
                                                   {(item.promo_code_use && item.promo_code_use.length)}
                                               </TableCell>
                                           </>
                                        )
                                    }
                                    <TableCell>
                                        {
                                            user.roles[0].name === 'master_access' && (
                                                <>
                                                    <Edit onClick={() => handleEdit(item)}/>
                                                    <Delete onClick={() => handleDeleteConfirmation(item)}/>
                                                </>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={promoType === 'price' ? 5 : 4}>No data available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>


            <Dialog fullWidth open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add Promo Code</DialogTitle>
                <DialogContent>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <TextField
                                id="code"
                                label="Code"
                                variant="outlined"
                                fullWidth
                                required
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                autoComplete="code"
                                style={{marginTop: '20px', marginBottom: '20px'}}
                            />
                            <InputError className="mt-2" message={errors.code}/>
                        </div>
                        <div>
                            <TextField
                                id="price"
                                label="Price"
                                variant="outlined"
                                fullWidth
                                required
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                autoComplete="price"
                                style={{marginTop: '20px', marginBottom: '20px'}}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button fullWidth type="submit" variant="contained" sx={{backgroundColor: admin.bgBlue}}>
                                Save
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog fullWidth open={isDialogOpen1} onClose={() => setDialogOpen1(false)}>
                <DialogTitle>Add Promo Code</DialogTitle>
                <DialogContent>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <TextField
                                id="code"
                                label="Code"
                                variant="outlined"
                                fullWidth
                                required
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                autoComplete="code"
                                style={{marginTop: '20px', marginBottom: '20px'}}
                            />
                            <InputError className="mt-2" message={errors.code}/>
                        </div>
                        <div>
                            <TextField
                                id="rate"
                                label="Rate"
                                variant="outlined"
                                fullWidth
                                required
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                autoComplete="price"
                                style={{marginTop: '20px', marginBottom: '20px'}}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button fullWidth type="submit" variant="contained" sx={{backgroundColor: admin.bgBlue}}>
                                Save
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog fullWidth open={isTypeDialogOpen} onClose={() => setTypeDialogOpen(false)}>
                <DialogTitle>Select Promo Type</DialogTitle>
                <DialogContent style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                    <Button
                        style={{margin: '0 10px'}}  // Add margin for spacing
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setPromoType('without_price');
                            setDialogOpen1(true);

                        }}
                    >
                        Without Price Promo Code
                    </Button>
                    <Button
                        style={{margin: '0 10px'}}  // Add margin for spacing
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setPromoType('price');
                            setDialogOpen(true);
                        }}
                    >
                        Price Promo Code
                    </Button>
                </DialogContent>
            </Dialog>


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

            {/* Edit Form in Modal */}
            <Dialog fullWidth open={isEditFormOpen} onClose={() => setEditFormOpen(false)}>
                <DialogTitle>Edit Promo Code</DialogTitle>
                <DialogContent>
                    <form onSubmit={update} className="mt-6 space-y-6">
                        <div>
                            <TextField
                                id="code"
                                label="Code"
                                variant="outlined"
                                fullWidth
                                required
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                autoComplete="code"
                                style={{marginTop: '20px'}}
                            />
                            <InputError className="mt-2" message={errors.code}/>
                        </div>
                        {data.price && (
                            <div>
                                <TextField
                                    id="price"
                                    label="Price"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    autoComplete="price"
                                    style={{marginTop: '20px'}}
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button fullWidth type="submit" variant="contained" sx={{backgroundColor: admin.bgBlue}}>
                                Save
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
