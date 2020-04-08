import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface Props {
    onClick?: () => any;
    tipTitle: string;
    tipClassName?: string;
    btnClassName?: string;
    disabled?: boolean
}

const MyButton : React.FC<Props>  = ({children, onClick, tipTitle, tipClassName, btnClassName, ...rest}) => (
    <Tooltip title={tipTitle} className={tipClassName} placement='top' >
        <IconButton onClick={onClick} className={btnClassName} {...rest} >
            {children}
        </IconButton> 
    </Tooltip>

)
    

export default MyButton

