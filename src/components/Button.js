import React from 'react'
import './Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButonStyles = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButonSize = STYLES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button className={`btn ${checkButonStyles} ${checkButonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}