import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputError from "@/Components/InputError";
import SelectCountry from './Steps/SelectCountry';
import SelectPickUp from './Steps/SelectPickUp';
import SelectDropOff from './Steps/SelectDropOff';
import OrderForm from './Steps/OrderForm/OrderForm';
import PrimaryButton from "@/Components/PrimaryButton";
import { DialogTitle, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
const steps = ['În ce țară te afli', 'Alegeți serviciul de expediere', 'Alegeți serviciul de primire', 'Completeaza formular'];

export default function OrderStepper({ openStepperModal, onClose}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [selectedCountry, setSelectedCountry] = React.useState('');
    const [selectedPickUp, setSelectedPickUp] = React.useState('');
    const [selectedDropOff, setSelectedDropOff] = React.useState('');
    const [selectedError, setSelectedError] = React.useState('');
    const [services, setServices] = React.useState('');
    const theme = useTheme()
    const handleCountryChange = (value) => {
        setSelectedCountry(value);
    };

    const handlePickUpChange = (value) => {
        setSelectedPickUp(value);
    };


    const handleDropOffChange = (value) => {
        setSelectedDropOff(value);
    }; // State to store the selected country


    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if(activeStep == 0 && selectedCountry == '')
        {
            setSelectedError('Selectați o țară');
            return false
        }
        if(activeStep == 1 && selectedPickUp == '')
        {
            setSelectedError('Selectați serviciul de preluare');
            return false
        }
        if(activeStep == 2 && selectedDropOff == '')
        {
            setSelectedError('Selectați serviciul DropOff');
            return false
        }
        if(activeStep == 2)
        {
            if(selectedPickUp == 'doorstep' && selectedDropOff == 'doorstep')
            {
                setServices('DTD');
            }
            if(selectedPickUp == 'doorstep' && selectedDropOff == 'collectionpoint')
            {
                setServices('DTC');
            }
            if(selectedPickUp == 'collectionpoint' && selectedDropOff == 'collectionpoint')
            {
                setServices('CTC');
            }
            if(selectedPickUp == 'collectionpoint' && selectedDropOff == 'doorstep')
            {
                setServices('CTD');
            }
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        setSelectedError('');
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setSelectedCountry(''); // Reset the selected country when resetting the stepper
    };
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log(activeStep, '+++++++++++')
    return (
        <div>
            <Dialog open={openStepperModal} onClose={onClose} fullWidth maxWidth="lg">
                <DialogTitle>
                    {
                        isSmallScreen ? 
                        
                        <Stepper activeStep={activeStep} sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', p: 2 }}>
    {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        if (index === activeStep) {
            return (
                <Step key={label} {...stepProps} sx={{ mb: 2,}}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
        } else {
            return (
                <Step key={label} {...stepProps} >
                    {/* Uncomment the following line to display tick marks for completed steps */}
                    {/* <StepLabel {...labelProps}>{index + 1}</StepLabel> */}
                </Step>
            );
        }
    })}
</Stepper>
                    
                    :
                        <Stepper activeStep={activeStep} sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', p: 2 }}>
                            {steps.map((label, index) => {
                                console.log(label)
                                const stepProps = {};
                                const labelProps = {};
                                // if (isStepOptional(index)) {
                                //     stepProps.completed = false;
                                // }
                                // if (isStepSkipped(index)) {
                                //     stepProps.completed = false;
                                // }
                                return (
                                    <Step key={label} {...stepProps} sx={{mb:2, width:'200px'}}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    }
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: '100%' }}>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {activeStep === 0 && (
                                     <SelectCountry selected={selectedCountry} onChange={handleCountryChange} />
                                )}
                                {activeStep === 1 && (
                                     <SelectPickUp selected={selectedPickUp} onChange={handlePickUpChange} />
                                )}
                                {activeStep === 2 && (
                                   <SelectDropOff selected={selectedDropOff} onChange={handleDropOffChange} />
                                )}
                                {activeStep === 3 && (
                                    <OrderForm service={services} to={selectedCountry} />
                                )}
                                <InputError className="mt-2" message={selectedError}/>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Înapoi
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {/*{isStepOptional(activeStep) &&*/}
                                    {/*(*/}
                                    {/*    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>*/}
                                    {/*        Skip*/}
                                    {/*    </Button>*/}
                                    {/*)*/}
                                    {/*}*/}
                                    {activeStep === steps.length - 1 ?
                                        ''
                                        :
                                        <PrimaryButton  onClick={handleNext}>
                                            Următorul
                                        </PrimaryButton>

                                    }

                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
