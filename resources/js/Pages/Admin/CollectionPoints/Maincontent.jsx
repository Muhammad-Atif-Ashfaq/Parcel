import React, {useState} from 'react';
import {useForm} from "@inertiajs/react";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import  {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import InputLabel from "@/Components/InputLabel";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Delete, Edit, HdrPlusRounded} from "@mui/icons-material";
import {admin} from "@/Pages/Admin/Styles/Styles";

export default function Maincontent(collectionPoint) {
console.log(collectionPoint.collectionPoint);
    const [items, setItems] = useState(collectionPoint.collectionPoint);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null); // Define the itemToEdit state variable

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDeleteConfirmation = (item) => {
        setItemToDelete(item);
        setDeleteConfirmationOpen(true);
    }
    // Function to handle opening the edit form in the modal
    const {data, setData, post, put, reset, delete: destroy, errors, processing, recentlySuccessful} = useForm({
        email: '',
        password: '',
        name: '',
        address: '',
        longitude: '',
        latitude: '',
        location: '',
        last_collection_time: '',
        last_collection_day:''
    });
    const handleEdit = (item) => {

        setData({
            ...data,
            'name': item.name,
            'email': item.users.email,
            'password': item.users.show_password,
            'address': item.address,
            'longitude': item.longitude,
            'latitude': item.latitude,
            'location': item.sides,
            'last_collection_time' : item.last_collection_time,
            'last_collection_day': item.last_collection_day
        })

        setItemToEdit(item.id);
        setEditFormOpen(true); // Open the edit form in the modal
    };


    const [isDialogOpen, setDialogOpen] = useState(false); // Define isDialogOpen state
    // const [items, setItems] = useState([]);


    const submit = (e) => {
        e.preventDefault();
        post(route('admin.collection_points.store'));
        setDialogOpen(false);
        data.email = null;
        data.password = null;
        data.name = null;
        data.address = null;
        data.longitude = null;
        data.latitude = null;
        data.location = null;
    };

    const update = (e) => {
        e.preventDefault();
        put(route('admin.collection_points.update', itemToEdit));
        setEditFormOpen(false);

    };

    const handleDeleteItem = async () => {

        destroy(route('admin.collection_points.destroy', itemToDelete.id), {
            preserveScroll: true,
            onSuccess: ({props}) => {
                setDeleteConfirmationOpen(false);
                setItems(props.products);
                reset();
                clearErrors();

            },
        });
    };


    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogOpen(true)}
                startIcon={<HdrPlusRounded/>}
            >
                Add Item
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>NAME</b></TableCell>
                        <TableCell><b>ADDRESS</b></TableCell>
                        <TableCell><b>LOGITUDE</b></TableCell>
                        <TableCell><b>LATITUDE</b></TableCell>
                        <TableCell><b>SIDES</b></TableCell>
                        <TableCell><b>LAST COLLECION DATE/TIME</b></TableCell>
                        <TableCell><b>Action</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {collectionPoint.collectionPoint && collectionPoint.collectionPoint.length > 0 ? (
                        collectionPoint.collectionPoint.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell sx={{
                                     width: '24px',
                                     height: '24px',
                                     borderRadius: '50%',
                                     backgroundColor: 'blue',
                                     color: 'yellow',
                                     display: 'flex',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                     fontWeight: 'bold',

                                }}>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.latitude}</TableCell>
                                <TableCell>{item.longitude}</TableCell>
                                <TableCell>{item.sides}</TableCell>
                                <TableCell>{item.last_collection_day && item.last_collection_time !== null
                                            ? `${item.last_collection_day} ${item.last_collection_time}`
                                            : 'null'}
                                </TableCell>
                                <TableCell>
                                    <Edit sx={{cursor:'pointer'}} onClick={() => handleEdit(item)}/>
                                    <Delete sx={{cursor:'pointer'}} onClick={() => handleDeleteConfirmation(item)}/>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>No data available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog fullWidth open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add Collection Center</DialogTitle>
                <DialogContent>
                    <form onSubmit={submit} className="mt-6 space-y-6">

                        <div>
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="address"
                                label="Address"
                                variant="outlined"
                                fullWidth
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                autoComplete="address"
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="longitude"
                                label="Longitude"
                                variant="outlined"
                                fullWidth
                                type="number"
                                step="0.1"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                autoComplete="longitude"
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="latitude"
                                label="Latitude"
                                variant="outlined"
                                fullWidth
                                type="number"
                                step="0.1"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                autoComplete="latitude"
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div>
                            <RadioGroup
                                row
                                aria-label="location"
                                name="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            >
                                <FormControlLabel value="uk" control={<Radio/>} label="UK"/>
                                <FormControlLabel value="moldova" control={<Radio/>} label="Moldova"/>
                            </RadioGroup>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button fullWidth type="submit" variant="contained" sx={{backgroundColor: admin.bgBlue}}>
                                Save
                            </Button>
                        </div>
                    </form>
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

            <Dialog fullWidth open={isEditFormOpen} onClose={() => setEditFormOpen(false)}>
                <DialogTitle>Edit Collection Center</DialogTitle>
                <DialogContent>
                    <form onSubmit={update} className="mt-6 space-y-6">

                        <div>
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="address"
                                label="Address"
                                variant="outlined"
                                fullWidth
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                autoComplete="address"
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="longitude"
                                label="Longitude"
                                variant="outlined"
                                fullWidth
                                type="number"
                                step="0.1"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                autoComplete="longitude"
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="latitude"
                                label="Latitude"
                                variant="outlined"
                                fullWidth
                                type="number"
                                step="0.1"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                autoComplete="latitude"
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div>
                            <InputLabel id="status">Last Collection Day</InputLabel>
                            <Select
                                labelId="last_collection_day"
                                id="last_collection_day"
                                value={data.last_collection_day}
                                label="last_collection_day"
                                onChange={(e) => setData('last_collection_day', e.target.value)}
                            >
                                <MenuItem value='Luni'>Luni</MenuItem>
                                <MenuItem value='marți'>marți</MenuItem>
                                <MenuItem value='miercuri'>miercuri</MenuItem>
                                <MenuItem value='joi'>joi</MenuItem>
                                <MenuItem value='vineri'>vineri</MenuItem>
                                <MenuItem value='sâmbătă'>sâmbătă</MenuItem>
                                <MenuItem value='duminică'>duminică</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <TextField
                                    id="last_collection_time"
                                    label="Last Collection Time"
                                    variant="outlined"
                                    type="time"
                                    fullWidth
                                    value={data.last_collection_time}
                                    onChange={(e) => setData('last_collection_time', e.target.value)}
                                    autoComplete="last_collection_time"
                                    style={{marginTop: '20px'}}
                                />
                        </div>
                        <div>
                            <RadioGroup
                                row
                                aria-label="location"
                                name="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            >
                                <FormControlLabel value="uk" control={<Radio/>} label="UK"/>
                                <FormControlLabel value="moldova" control={<Radio/>} label="Moldova"/>
                            </RadioGroup>
                        </div>
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
