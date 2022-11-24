import {
    IcAddCircle
} from '../../../assets'

const Icon = ({ name, variant, size, color }) =>
{
    const currentSize = size ? size : '24'
    const currentColor = color ? color : '#999999'

    if(name === 'add-circle') return <IcAddCircle variant={variant} size={currentSize} color={currentColor} />

    return <span>Icon Not Found.</span>
}

export default Icon