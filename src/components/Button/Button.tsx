import { ReactNode, MouseEvent } from 'react';
import './Button.css';

type ButtonProps = {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    selected?: boolean;
};

const Button = ({ children, onClick, disabled, selected }: ButtonProps) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className={selected ? "selected" : ''}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;