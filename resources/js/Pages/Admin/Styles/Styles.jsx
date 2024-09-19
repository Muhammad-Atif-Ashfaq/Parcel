export const admin = {
    bgBlue: '#0051A8',
    bgGray: '#FEFEFD',
    bgGrayDark: '#F4F4F3',
    textBlue:'#0051A8',
    textWhite: 'white',

};

export const topBarStyles = {
    backgroundColor: '#333',
    color: '#fff',
    height: '60px',
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
};

export const buttonStyles = {
    bgcolor: admin.bgBlue,
    color: '#fff',
    '&:hover': {
        backgroundColor: '#7393B3', // Change to your desired hover color
        color: 'white', // Change to your desired hover text color
    },
};
