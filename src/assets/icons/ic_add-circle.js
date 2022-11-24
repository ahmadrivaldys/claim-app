const IcAddCircle = ({ variant, size, color }) =>
{
    if(variant === "filled")
    {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 512 512"
                fill={color}
            >
                <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z"/>
            </svg>
        )
    }

    return (
        <svg
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 512 512"
            stroke={color}
            strokeWidth="32"
        >
            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" strokeMiterlimit="10"/>
            <path strokeLinecap="round" strokeLinejoin="round"  d="M256 176v160M336 256H176"/>
        </svg>
    )
}

export default IcAddCircle