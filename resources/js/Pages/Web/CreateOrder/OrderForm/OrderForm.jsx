import React, {useState} from 'react';
import {Grid, Typography, useTheme} from "@mui/material";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import {web} from "@/Pages/Web/Styles/Styles";
import axios from 'axios';
import PlacesSearch from "@/Pages/Web/CreateOrder/OrderForm/PlacesSearch/PlacesSearch";


export default function OrderForm({user, service, to}) {
    const theme = useTheme()
    const [isCouponCodeError, setCouponCodeError] = useState('');

    const {data, setData, post, errors, processing, recentlySuccessful} = useForm({
        service: service,
        order_destination: to,
        weight: '',
        price: 0,
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

    const submit = (e) => {
        e.preventDefault();
        post(route('order.store'));
    };

    const applyPromoCode = async () => {
        try {
            if (data.promo_code == '') {
                setCouponCodeError('PromoCode is required');
                return false;
            }
            const response = await axios.post(route('check.promo_code', [data.promo_code, data.price]))
            if (response.data.success) {
                const newPrice = data.price - parseFloat(response.data.payload.price);
                setData('price', newPrice);
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
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: web.textBlue}}>
                            Sender Details:
                        </Typography>
                        <div>
                            <InputLabel htmlFor="sender_name" value="Name"/>
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
                            <InputLabel htmlFor="sender_email" value="Email"/>
                            <TextInput
                                id="sender_email"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('sender_email', e.target.value)}
                                autoComplete="sender_name"
                            />

                            <InputError className="mt-2" message={errors.sender_email}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="sender_phone" value="Phone"/>
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
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color: web.textBlue}}>
                            Receiver Details:
                        </Typography>
                        <div>
                            <InputLabel htmlFor="receiver_name" value="Name"/>
                            <TextInput
                                id="receiver_name"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('receiver_name', e.target.value)}
                                autoComplete="receiver_name"
                            />

                            <InputError className="mt-2" message={errors.receiver_name}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="receiver_email" value="Email"/>
                            <TextInput
                                id="receiver_email"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('receiver_email', e.target.value)}
                                autoComplete="receiver_name"
                            />

                            <InputError className="mt-2" message={errors.receiver_email}/>
                        </div>
                        <div>
                            <InputLabel htmlFor="receiver_phone" value="Phone"/>
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
                            errors={errors}
                            address={data.receiver_address}
                            onChange={(value) => setData('receiver_address', value)}
                            onCLickLi={(returnPoint) => {
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
                    Order Details:
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} sx={{
                        padding: '0px 10px',
                    }}>
                        <div>
                            <InputLabel htmlFor="weight" value="Weight"/>
                            <TextInput
                                id="weight"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('weight', e.target.value)}
                                autoComplete="weight"
                            />

                            <InputError className="mt-2" message={errors.weight}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{
                        padding: '0px 10px',
                    }}>
                        <div>
                            <InputLabel htmlFor="price" value="Price"/>
                            <TextInput
                                id="price"
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
                    <InputLabel htmlFor="description" value="Description"/>
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
                        <InputLabel htmlFor="promo_code" value="PromoCode"/>
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
                    <div>
                        <p onClick={applyPromoCode}>Apply Coupon</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </>
    );
}

