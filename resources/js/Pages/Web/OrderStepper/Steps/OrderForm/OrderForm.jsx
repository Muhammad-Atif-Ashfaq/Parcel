import React, {useState} from 'react';
import {Box, FormControlLabel, Grid, Radio, RadioGroup, Typography, useTheme} from "@mui/material";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import {web} from "@/Pages/Web/Styles/Styles";
import axios from 'axios';
import PlacesSearch from "./PlacesSearch/PlacesSearch";
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2';
import './styles.css'

export default function OrderForm({service, to}) {
    // console.log(to, '++++++++++++++++++++')
    const theme = useTheme()
    const [isCouponCodeError, setCouponCodeError] = useState('');
    const [rate, setRate] = useState(1.50);

    const handleOpenModal = (amountSaved) => {
        Swal.fire({
            title: "You saved",
            text: ` £ ${amountSaved}.`,
            icon: 'success',
            customClass: {
                container: 'my-swal',
            },
        });

    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const {data, setData, post, errors, processing, recentlySuccessful} = useForm({
        service: service,
        order_destination: to,
        weight: 0,
        price: 0,
        rate: 1.50,
        promo_code: '',
        description: '',
        needs_refrigeration: false,
        sender_name: '',
        sender_email: '',
        sender_phone: '',
        sender_address: '',
        sender_collection_points_id: '',
        receiver_name: '',
        receiver_email: '',
        receiver_phone: '',
        receiver_address: '',
        receiver_collection_points_id: '',
    })

    const handleWeightChange = (e) => {
        let weight = parseFloat(e.target.value);
        let price = handleStanderdPrice(weight);
        let rate = data.rate;
        setData({...data, weight: parseFloat(weight), price: parseFloat(price).toFixed(2), rate: parseFloat(rate)})
    };
    // console.log(data.receiver_collection_points_id, '++++++++++++++++++++++++++')
    const handleStanderdPrice = (weight) => {
        let rate = data.rate;
        let price = 0;

        if (!isNaN(weight)) {
            if(weight <= 5)
            {
                price = 7.5;
            }else
            {
                if (service === 'CTC') {
                    price = weight * rate;
                } else if (service === 'DTC') {
                    if(weight > 80)
                    {
                        price = weight * rate;
                    }else
                    {
                        price = (weight * rate) + 4;
                    }
                } else if (service === 'CTD') {
                    if(weight > 80)
                    {
                        price = weight * rate;
                    }else
                    {
                        price = (weight * rate) + 6;
                    }
                } else if (service === 'DTD') {
                    if(weight > 80)
                    {
                        price = weight * rate;
                    }else
                    {
                        price = (weight * rate) + 10;
                    }
                }
            }
            return price;
        }
    }

    // const handleRateChange = (e) => {
    //     let weight = data.weight;
    //     let price = handleStanderdPrice(weight);
    //     let rate = data.rate;
    //     setData({...data, weight: parseFloat(weight), price: parseFloat(price).toFixed(2), rate: parseFloat(rate)})
    // };

    const submit = (e) => {
        e.preventDefault();
        // console.log(data, "DATAAAAAAAAA")
        post(route('order.store'));

    };
    console.log(errors);
    const applyPromoCode = async () => {
        try {
            if (data.promo_code == '') {
                setCouponCodeError('Codul promoțional este necesar”');
                return false;
            }
            if (data.price == 0) {
                setCouponCodeError('Prețul trebuie să fie mai mare decât 0');
                return false;
            }
            const response = await axios.post(route('check.promo_code', [data.promo_code, data.weight]))
            if (response.data.success) {
                setData('promo_code_type', response.data.payload.type); // Instead of using this
                setData('promo_code_price', response.data.payload.price); // Instead of using this
                if(response.data.payload.type === 'without_price')
                {
                    // if(data.weight <= 5)
                    // {
                    //     let newPrice = 15;
                    //     let savedAmount = 5;
                    //     setData('price', newPrice);
                    //     setCouponCodeError('')
                    //     handleOpenModal(savedAmount);
                    // }
                    // else
                    if(data.weight > 5)
                    {
                        const rate = parseFloat(response.data.payload.price);
                        let newPrice = 0;
                        // console.log(data.weight,rate)
                        if (service === 'CTC') {
                            newPrice = data.weight * rate;
                        } else if (service === 'DTC') {
                            newPrice = (data.weight * rate) + 4;
                        } else if (service === 'CTD') {
                            newPrice = (data.weight * rate) + 6;
                        } else if (service === 'DTD') {
                            newPrice = (data.weight * rate) + 10;
                        }
                        let savedAmount = (data.weight * (1.5 - rate)).toFixed(2);
                        setRate(parseFloat(rate))
                        setData({...data, price: parseFloat(newPrice).toFixed(2), rate: parseFloat(rate)})
                        setCouponCodeError('')
                        handleOpenModal(savedAmount);

                    }else
                    {
                        setCouponCodeError('A apărut o eroare cu acest cod promoțional, încercați din nou mai târziu');
                        return false;
                    }

                }else
                {
                    if(data.weight >= 20)
                    {
                        let newPrice = handleStanderdPrice(data.weight);
                        newPrice = newPrice - parseFloat(response.data.payload.price);
                        let savedAmount = response.data.payload.price;
                        setData('price', newPrice.toFixed(2));
                        setCouponCodeError('');
                        handleOpenModal(savedAmount);
                    }else
                    {
                        setCouponCodeError('Pentru aceasta greutate trebuie sa fie mai mare de 20 kg');
                        return false;
                    }

                }


            }
        } catch (error) {
            setCouponCodeError(error.response.data.message)
        }
    };


    return (
        <>
            <form onSubmit={submit} className="mt-6 space-y-6 text-left">
                <TextInput
                    onChange={(e) => setData('service', e.target.value)}
                    hidden
                />
                <TextInput
                    onChange={(e) => setData('order_destination', e.target.value)}
                    hidden
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} sx={{
                        borderRight: '2px solid blue',
                        padding: '0px 10px',
                        [theme.breakpoints.down('sm')]: {
                            border: 'none',
                        }
                    }}>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: web.textBlue}}>
                            Expeditorului:
                        </Typography>
                        {
                            to=="UK-to-Moldova" ?
                            <img
                                    src="img/uk-square.png"
                                    style={{
                                        height: "15px",
                                        display: "inline",
                                        marginLeft:"5px",
                                        marginBottom:"6px"
                                        // margin: "-15px 5px",
                                    }}
                                    /> :
                                    <img
                                    src="img/moldova-square.png"
                                    style={{
                                        height: "15px",
                                        display: "inline",
                                        marginLeft:"5px",
                                        marginBottom:"6px"
                                    }}
                                    />

                        }
                                </Box>
                        <div>
                            <InputLabel htmlFor="sender_name" value="Numele"/>
                            <TextInput
                                id="sender_name"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('sender_name', e.target.value)}
                                isFocused
                                autoComplete="sender_name"
                            />

                            <InputError className="mt-2" message={errors.sender_name}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="sender_email" value="Email (optional)"/>
                            <TextInput
                                id="sender_email"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('sender_email', e.target.value)}
                                autoComplete="sender_name"
                            />

                            <InputError className="mt-2" message={errors.sender_email}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="sender_phone" value="Număr de telefon "/>
                            <TextInput
                                id="sender_phone"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('sender_phone', e.target.value)}
                                autoComplete="sender_phone"
                            />

                            <InputError className="mt-2" message={errors.sender_phone}/>
                        </div>
                        <PlacesSearch
                            id='sender_address'
                            service={service}
                            dest={data.order_destination}
                            sides ='left'

                            errors={errors}
                            address={data.sender_address}
                            onChange={(value) => setData('sender_address', value)}
                            onCLickLi={(returnPoint) => {
                                setData({
                                    ...data,
                                    'sender_address': returnPoint.address,
                                    'sender_collection_points_id': returnPoint.collection_id,
                                })

                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{
                        padding: '0px 10px',
                    }}>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: web.textBlue}}>
                            Destinatarului:
                        </Typography>
                        {
                            to=="UK-to-Moldova" ?
                            <img
                                    src="img/moldova-square.png"
                                    style={{
                                        height: "15px",
                                        display: "inline",
                                        marginLeft:"5px",
                                        marginBottom:"6px"
                                        // margin: "-15px 5px",
                                    }}
                                    /> :
                                    <img
                                    src="img/uk-square.png"
                                    style={{
                                        height: "15px",
                                        display: "inline",
                                        marginLeft:"5px",
                                        marginBottom:"6px"
                                    }}
                                    />

                        }
                        </Box>
                        <div>
                            <InputLabel htmlFor="receiver_name" value="Numele"/>
                            <TextInput
                                id="receiver_name"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('receiver_name', e.target.value)}
                                autoComplete="receiver_name"
                            />

                            <InputError className="mt-2" message={errors.receiver_name}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="receiver_email" value="Email (optional)"/>
                            <TextInput
                                id="receiver_email"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('receiver_email', e.target.value)}
                                autoComplete="receiver_name"
                            />

                            <InputError className="mt-2" message={errors.receiver_email}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="receiver_phone" value="Număr de telefon"/>
                            <TextInput
                                id="receiver_phone"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('receiver_phone', e.target.value)}
                                autoComplete="receiver_phone"
                            />

                            <InputError className="mt-2" message={errors.receiver_phone}/>
                        </div>
                        <PlacesSearch
                            id='receiver_address'
                            service={service}
                            errors={errors}
                            dest={data.order_destination}
                            sides = 'right'
                            address={data.receiver_address}
                            onChange={(value) => setData('receiver_address', value)}
                            onCLickLi={(returnPoint) => {
                                // console.log(returnPoint)
                                setData({
                                    ...data,
                                    'receiver_address': returnPoint.address,
                                    'receiver_collection_points_id': returnPoint.collection_id,
                                })
                            }}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{color: web.textBlue}}>
                    Comanda Detalii:
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} sx={{
                        padding: '0px 10px',
                    }}>
                        <div>
                            <InputLabel htmlFor="weight" value="Greutate Estimativa(optional)"/>
                            <TextInput
                                id="weight"
                                type="number"
                                step="0.1"
                                className="mt-1 block w-full"
                                onChange={handleWeightChange}
                                autoComplete="weight"
                            />

                            <InputError className="mt-2" message={errors.weight}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{
                        padding: '0px 10px',
                    }}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                            <div>
                                <RadioGroup
                                    column
                                    name="rate"
                                    value={data.rate}
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
                                            label={`£${rate}/kg + £4 pentru livrare`}
                                        />
                                    )}
                                    {service === 'CTD' && (
                                        <>
                                            <FormControlLabel value={rate} control={<Radio/>}
                                                              label={`£${rate}/kg + £6 pentru livrare`}/>
                                        </>

                                    )}
                                    {service === 'DTD' && (
                                        <FormControlLabel
                                            value={rate}
                                            control={<Radio/>}
                                            label={`£${rate}/kg + £10 pentru livrare`}
                                        />
                                    )}
                                </RadioGroup>

                            </div>
                            <div style={{display: 'flex'}}>
                                <span>£{data.price}</span>
                            </div>
                            <TextInput
                                type='hidden'
                                value={data.price}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('price', e.target.value)}
                                autoComplete="price"
                            />
                            <InputError className="mt-2" message={errors.price}/>
                        </div>
                    </Grid>
                </Grid>
                <div>
                    <InputLabel htmlFor="description" value="Ce Contine Coletul (optional)"/>
                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('description', e.target.value)}
                        autoComplete="description"
                    />
                    <InputError className="mt-2" message={errors.price}/>
                </div>
                <div className="d-flex">
                    <div>
                        <InputLabel htmlFor="promo_code" value="Cod promoțional"/>
                        <TextInput
                            id="promo_code"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('promo_code', e.target.value)}
                            autoComplete="description"
                        />
                        {isCouponCodeError &&

                        <InputError className="mt-2" message={isCouponCodeError}/>

                        }
                        <InputError className="mt-2" message={errors.promo_code}/>
                    </div>
                    <div style={{
                        marginTop:'10px',
                        marginBottom:'10px'
                    }}>
                        <span style={{
                            padding:'10px',
                            background:'#0a63c1',
                            borderRadius:'10px',
                            color:'white',

                        }} onClick={applyPromoCode}>Aplicati Cuponul</span>
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={data.needs_refrigeration === true}
                                value={data.needs_refrigeration}
                                onChange={() => setData('needs_refrigeration', !data.needs_refrigeration)}
                            />
                        }
                        label="Aveti nevoie ca coletul sa fie plasat in frigider?"
                    />
                    <InputError className="mt-2" message={errors.needs_refrigeration}/>
                </div>

                <div className="flex items-center float-right gap-4">
                    <PrimaryButton disabled={processing}>Salvați</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Salvat.</p>
                    </Transition>
                </div>
            </form>
        </>
    );
}

