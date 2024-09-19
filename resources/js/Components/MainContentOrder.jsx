import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import {
  Avatar,
  Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle, Divider, FormControl,
    FormControlLabel,
    Grid, IconButton,
    MenuItem,
    Pagination,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme,

} from '@mui/material';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {admin} from "@/Pages/Admin/Styles/Styles";
import {useForm} from "@inertiajs/react";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { Input } from '@mui/material';
export default function MainContentOrder({user,orders,collectionPoint, name}) {


  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [items, setItems] = useState(orders.data);
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [isUpdateAllFormOpen, setUpdateAllFormOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [isCollectionPointFormOpen, setCollectionPointFormOpen] = useState(false);
    const [service, setService] = useState('CTC');
    const [promoCodePrice, setPromoCodePrice] = useState('');
    const [promoCodeType, setPromoCodeType] = useState('');
    const [checkPromoCode, setcheckPromoCode] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rate, setRate] = useState(1.50);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const theme = useTheme()


    const handleDeleteConfirmation = (item) => {
      setItemToDelete(item);
      setDeleteConfirmationOpen(true);
  }
    // Function to handle date filtering
    const handleDateFilter = () => {

        const filteredData = orders.data.filter((item) => {
            const orderDate = new Date(item.created_at);
            const startDates = new Date(startDate);
            const endDates = new Date(endDate);
            return (
                (!startDates || orderDate >= startDates) &&
                (!endDates || orderDate <= endDates)
                );
              });
              setItems(filteredData);
            };
            
    const handleUpdateCollectionPoint = (item) => {
        console.log(item)
        setFormDatacp({
            ...formDatacp,
            'orderId': item.id,
            'senderCollectionPoint': item.sender_collection_points_id,
            'receiverCollectionPoint': item.receiver_collection_points_id,
        });
        setItemToEdit(item.id);
        setCollectionPointFormOpen(true);
    };

    const {
        data: formData,
        setData: setFormData,
        post: postFormData,
        put: putFormData,
        delete: destroy,
        reset: resetFormData,
        clearErrors: clearErrorsFormData,
        errors: errorsFormData,
        processing: processingFormData,
        recentlySuccessful: recentlySuccessfulFormData
    } = useForm({
        weight: '',
        status: '',
        service: '',
        rate: 1.50,
        price: 0,
        notes: ''
    });
    const {
      data: formDatacp,
      setData: setFormDatacp,
      post: postFormDatacp,
      put: putFormDatacp,
      reset: resetFormDatacp,
      clearErrors: clearErrorsFormDatacp,
      errors: errorsFormDatacp,
      processing: processingFormDatacp,
      recentlySuccessful: recentlySuccessfulFormDatacp
  } = useForm({
    senderCollectionPoint: '',
    receiverCollectionPoint: '',

  });


    const {
        data: formDataAll,
        setData: setFormDataAll,
        post: postFormDataAll,
        put: putFormDataAll,
        reset: resetFormDataAll,
        clearErrors: clearErrorsFormDataAll,
        errors: errorsFormDataAll
    } = useForm({
        orders: [],
        status: ''
    });

    const handleEdit = (item) => {

        setFormData({
            ...formData,
            'weight': parseFloat(item.weight),
            'rate': parseFloat(item.rate),
            'status': item.status,
            'service': item.service,
            'price': parseFloat(item.price),
            'notes': item.extra_notes
        });
        setRate(parseFloat(item.rate))
        setService(item.service);
        setItemToEdit(item.id);
        setPromoCodePrice(item.promo_code_price)
        setPromoCodeType(item.promo_code_type)
        setcheckPromoCode(item.promo_code)
        setEditFormOpen(true); // Open the edit form in the modal
    };

    const handleWeightChange = (e) => {
        console.log(promoCodePrice, promoCodeType, checkPromoCode)
        let weight = parseFloat(e.target.value);

        let rate = formData.rate;
        let price = 0;

        if (!isNaN(weight)) {

            if (weight <= 5) {
                price = 7.5;
            } else {
                if (service === 'CTC') {
                    price = weight * rate;
                } else if (service === 'DTC') {
                    price = (weight * rate) + 9;
                } else if (service === 'CTD') {
                    price = (weight * rate) + 7.50;
                } else if (service === 'DTD') {
                    price = (weight * rate) + 15;
                }
            }
        }
        if(checkPromoCode)
        {
            if(promoCodeType === 'price')
            {
                price = price - promoCodePrice;
            }
        }

        setFormData({...formData, weight: parseFloat(weight), price: parseFloat(price).toFixed(2), rate: parseFloat(rate)})
    };

    const handleRateChange = (e) => {
        let weight = data.weight;

        let rate = parseFloat(e.target.value);
        let price = 0;
        if (!isNaN(weight)) {
            if (weight <= 5) {
                price = 7.5;
            } else {
                if (service === 'CTC') {
                    price = weight * rate;
                } else if (service === 'DTC') {
                    price = (weight * rate) + 9;
                } else if (service === 'CTD') {
                    price = (weight * rate) + 7.50;
                } else if (service === 'DTD') {
                    price = (weight * rate) + 15;
                }
            }

        }
        setFormData({...formData, weight: parseFloat(weight), price: parseFloat(price).toFixed(2), rate: parseFloat(rate)})
    };

    const update = (e) => {
        e.preventDefault();
        postFormData(route('admin.order.update', itemToEdit), {
            preserveScroll: true,
            onSuccess: ({props}) => {
                setEditFormOpen(false);
                setItems(props.orders.data);
                resetFormData();
                clearErrorsFormData();
                

            },
        });

    };
    const updateAllItems = (e) => {
        e.preventDefault();
        postFormDataAll(route('admin.orders.updateAll'), {
            preserveScroll: true,
            onSuccess: ({props}) => {

                setUpdateAllFormOpen(false);
                setItems(props.orders.data);
                resetFormDataAll();
                clearErrorsFormDataAll();
                setSelectedOrders([]);
            },
        });

    };


    const updateCollectionPoint = (e) => {
      e.preventDefault();
        // console.log(itemToEdit, data.collectionPoint);
        postFormDatacp(route('admin.veloce_link.update', itemToEdit), {
          preserveScroll: true,
          onSuccess: ({props}) => {

            setCollectionPointFormOpen(false);
              setItems(props.orders.data);
              resetFormDatacp();
              clearErrorsFormDatacp();
             
          },
      });
       
        // data.weight = null
    };

    const handleDeleteItem = async () => {

      destroy(route('admin.order.destroy', itemToDelete.id), {
          preserveScroll: true,
          onSuccess: ({props}) => {
              setDeleteConfirmationOpen(false);
              setItems(props.orders.data);
             

          },
      });
  };
   

    const tableData = items;
    
    const handleCheckboxChange = (id) => {
      if (selectedOrders.includes(id)) {
        setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
      } else {
        setSelectedOrders([...selectedOrders, id]);
      }
    };
    const handleUpdateAll = () => {
      setUpdateAllFormOpen(true)
      setFormDataAll('orders', selectedOrders);
  };
    
  // console.log(selectedOrders)
  const [sliceData, setSlicedData] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [filteredDep, setFilteredDep] = React.useState([]);
  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
    filterDep(e.target.value);
  }
  const filterDep = (searchText) => {
    const filtered = tableData.filter((dep) => {
      // console.log(dep, "THEEEEEE")
      return (
        dep.promo_code?.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.rate?.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.receiver_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.sender_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.service?.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.status?.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.id.toString().includes(searchText)
      );
    });
    setFilteredDep(filtered);
  };
  React.useEffect(() => {
    if (searchInput === "") {
      setFilteredDep(tableData);
      setSlicedData(tableData.slice(0, rowsPerPage));
    } else {
      filterDep(searchInput);
      setSlicedData(filteredDep.slice(0, rowsPerPage));
    }
  }, [searchInput, tableData, filteredDep]);
  const [page, setPage] = React.useState(1);
    const rowsPerPage = 50;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedData = filteredDep.slice(startIndex, endIndex);
    return (
        <div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} sx={{ paddingTop: '5px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="start-date" value="Start Date"/>
                        <input
                            type="date"
                            style={{width:'100%'}}
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} sx={{ paddingTop: '5px', paddingBottom: '10px' }}>
                        <InputLabel htmlFor="end-date" value="End Date"/>
                        <input
                            type="date"
                            id="end-date"
                            style={{width:'100%'}}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Button sx={{ marginTop: '20px', marginBottom: '10px',width:'100%' }} onClick={handleDateFilter} variant="contained">
                            Apply Date Filter
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <Box>
            <FormControl
        sx={{width:'50%'}}
        >
          <InputLabel> Search </InputLabel>
          <Input 
           value={searchInput}
           onChange={(e) => handleChangeSearch(e)}
          endAdornment={
            <InputAdornment position='end'>
            <SearchIcon />
            </InputAdornment>
          }
          
          
          />
        </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(tableData.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
              <Box sx={{mt:5,}}>
                  <Typography variant='h4'>
                    {name}
                  </Typography>
                  <Button variant={
                  selectedOrders.length < 1 ? 'disabled' : 'contained'}
                  onClick={selectedOrders.length >= 1 ? handleUpdateAll : undefined}
                            sx={{ marginTop: '5px', marginBottom: '5px',marginRight:'5px' }}
                    >Update ALl</Button>
                    {
                      sliceData.length < 1 && (
                        <Typography variant='h4' textAlign="center" fontWeight="bold">
                          No Result Found
                        </Typography>
                      )
                    }
            {
              sliceData.map((val, ind) => {
                // console.log(val)
                return(
              <Card sx={{background:'#e2e2e2', }}>
                <CardContent>

                <Divider />
                <Box sx={{display:'flex', alignItems:'center', mt:3, justifyContent:'center'}}>
                      <Checkbox
                      onChange={() => handleCheckboxChange(val.id)}
                      checked={selectedOrders.includes(val.id)}
                    />
                    <Avatar sx={{background:'#0051A8'}}>
                      <Typography color="#FFFF00" fontWeight="bold">ID</Typography>
                    </Avatar>
                      <Typography sx={{ml:1, fontWeight:'bold'}} variant='h5'>{val.id}</Typography>
                    </Box>

                    <Stack sx={{mt:2}}>
                        <Typography variant='h4' textAlign="center" fontWeight="bold">Parcel Details</Typography>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Service : </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.service}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Destination: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.order_destination}</Typography>
                      </Box>

                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Weight: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.weight}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Price: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.price}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Referigration: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.needs_refrigeration}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Notes: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >false</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Promo Code: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.promo_code || '--------'}</Typography>
                      </Box>

                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Status </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.status}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Date </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.created_at}</Typography>
                      </Box>
                      <Typography variant='h4' textAlign="center" fontWeight="bold">Sender Details</Typography>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Name: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.sender_name}</Typography>
                      </Box>

                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Email: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.sender_email}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Phone: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.sender_phone}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Address: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.sender_address || '---------'}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Collection Point: </Typography>

                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.sender_collection_point}</Typography>
                      </Box>
                      <Typography variant='h4' textAlign="center" fontWeight="bold">Reciever Details</Typography>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Name: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.receiver_name}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Email: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.receiver_email}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Phone: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.receiver_phone}</Typography>
                      </Box>
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Address: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.receiver_address || '--------'}</Typography>
                      </Box>

                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h5' fontWeight="bold"
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.25rem'
                          }
                        }}
                        >Collection Point: </Typography>
                        <Typography variant='h5' ml={1}
                        sx={{
                          [theme.breakpoints.down('sm')] : {
                            fontSize:'1.05rem'
                          }
                        }}
                        >{val.receiver_collection_point}</Typography>
                      </Box>

                    </Stack>

                </CardContent>
                    <CardActions>
                      <Button variant='contained' onClick={()=>handleEdit(val)}> Update</Button>
                      <Button variant='contained'   onClick={() => handleUpdateCollectionPoint(val)}>  Add CP</Button>
                      {user && user.id === 1 ? (
                    <>
                      <Button variant='contained' sx={{ background:'red'}}  
                      onClick={() => handleDeleteConfirmation(val)}>  Delete</Button>
                      </>
                      ):''}
                    </CardActions>
              </Card>

                )
              })
            }
            </Box>
            {/* Edit Form in Modal */}
            <Dialog fullWidth open={isEditFormOpen} onClose={() => setEditFormOpen(false)}>
                <DialogTitle>Update Order</DialogTitle>
                <DialogContent>
                    <form onSubmit={update} className="mt-6 space-y-6">
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6} sx={{
                                    padding: '0px 10px',
                                }}>
                                    <div>
                                        <InputLabel htmlFor="weight" value="Weight"/>
                                        <TextInput
                                            id="weight"
                                            type="number"
                                            step="0.1"
                                            value={formData.weight}
                                            className="mt-1 block w-full"
                                            onChange={handleWeightChange}
                                            autoComplete="weight"
                                        />

                                        <InputError className="mt-2" message={errorsFormData.weight}/>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} sx={{
                                    padding: '0px 10px',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between"
                                    }}>
                                        <div>
                                            <RadioGroup
                                                column
                                                name="rate"
                                                value={formData.rate}
                                                // onChange={handleRateChange}
                                            >
                                                {service === 'CTC' && (
                                                    <FormControlLabel
                                                        value={rate}
                                                        control={<Radio/>}
                                                        label={`£${rate}/kg`}
                                                    />
                                                )}
                                                {service === 'DTC' && (
                                                    <FormControlLabel
                                                        value={rate}
                                                        control={<Radio/>}
                                                        label={`£${rate}/kg + £9 pentru livrare`}
                                                    />
                                                )}
                                                {service === 'CTD' && (
                                                    <>
                                                        <FormControlLabel value={rate} control={<Radio/>}
                                                                          label={`£${rate}/kg + £7.50 pentru livrare`}/>
                                                    </>

                                                )}
                                                {service === 'DTD' && (
                                                    <FormControlLabel
                                                        value={rate}
                                                        control={<Radio/>}
                                                        label={`£${rate}/kg + £15 pentru livrare`}
                                                    />
                                                )}
                                            </RadioGroup>

                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <span>£{formData.price}</span>
                                        </div>
                                        <TextInput
                                            type='hidden'
                                            value={formData.price}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setFormData('price', e.target.value)}
                                            autoComplete="price"
                                        />
                                        <InputError className="mt-2" message={errorsFormData.price}/>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                        <div>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="Status"
                                id="status"
                                value={formData.status}
                                label="status"
                                onChange={(e) => setFormData('status', e.target.value)}
                            >
                                <MenuItem value='In Progress'>In Progress</MenuItem>
                                <MenuItem value='Received'>Received</MenuItem>
                                <MenuItem value='In Transit'>In Transit</MenuItem>
                                <MenuItem value='Awaiting Collection'>Awaiting Collection</MenuItem>
                                <MenuItem value='Complete'>Complete</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="service">Service</InputLabel>
                            <Select
                                labelId="service"
                                id="service"
                                value={formData.service}
                                label="service"
                                onChange={(e) => setFormData('service', e.target.value)}
                            >
                                <MenuItem value='CTC'>collection to collection</MenuItem>
                                <MenuItem value='CTD'>collection to door</MenuItem>
                                <MenuItem value='DTC'>door to collection</MenuItem>
                                <MenuItem value='DTD'>door to door</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="additionalField">Extra Notes</InputLabel>
                            <TextField
                                fullWidth
                                labelId="notes"
                                multiline
                                rows={5}
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData('notes', e.target.value)}
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
            {/* Update All Form in Modal */}
            <Dialog fullWidth open={isUpdateAllFormOpen} onClose={() => setUpdateAllFormOpen(false)}>
                <DialogTitle>Update Order</DialogTitle>
                <DialogContent>
                    <form onSubmit={updateAllItems} className="mt-6 space-y-6">
                        <FormControl fullWidth>
                            <InputLabel id="status">Select Status</InputLabel>
                            <Select
                                labelId="Status"
                                id="status"
                                value={formDataAll.status}
                                label="Select Status"
                                required
                                onChange={(e) => setFormDataAll('status', e.target.value)}
                            >
                                {/*<MenuItem value=''>Select status</MenuItem>*/}
                                <MenuItem value='In Progress'>In Progress</MenuItem>
                                <MenuItem value='Received'>Received</MenuItem>
                                <MenuItem value='In Transit'>In Transit</MenuItem>
                                <MenuItem value='Awaiting Collection'>Awaiting Collection</MenuItem>
                                <MenuItem value='Complete'>Complete</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="flex items-center gap-4">
                            <Button fullWidth type="submit" variant="contained" sx={{backgroundColor: admin.bgBlue}}>
                                Save
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Add Collection Point */}
            <Dialog fullWidth open={isCollectionPointFormOpen} onClose={() => setCollectionPointFormOpen(false)}>
                <DialogTitle>Update Order</DialogTitle>
                <DialogContent>
                    <form onSubmit={updateCollectionPoint} className="mt-6 space-y-6">
                        <div>
                            <InputLabel id="status">Sender Collection Point</InputLabel>
                            <Select
                                labelId="Sender Collection Point"
                                id="senderCollectionPoint"
                                value={formDatacp.senderCollectionPoint}
                                label="senderCollectionPoint"
                                onChange={(e) => setFormDatacp('senderCollectionPoint', e.target.value)}
                            >
                                {collectionPoint.map((point) => (
                                    <MenuItem value={point.id}>
                                        {point.name} 
                                    </MenuItem>
                                ))}

                            </Select>
                        </div>
                        <div>
                            <InputLabel id="status">Receiver Collection Point</InputLabel>
                            <Select
                                labelId="receiverCollectionPoint"
                                id="receiverCollectionPoint"
                                value={formDatacp.receiverCollectionPoint}
                                label="receiverCollectionPoint"
                                onChange={(e) => setFormDatacp('receiverCollectionPoint', e.target.value)}
                            >
                                {collectionPoint.map((point) => (
                                    <MenuItem value={point.id}>
                                        {point.name} 
                                    </MenuItem>
                                ))}

                            </Select>
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

        </div>
    );
}
