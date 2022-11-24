import styles from './InputGroup.module.css'

const InputGroup = ({ className, bottomSpace, children, label }) =>
{
    return (
        <div className={className} style={inlineStyles.wrapper(bottomSpace)}>
            {label && (<label className={styles.label}>{label}</label>)}
            {children}
        </div>
    )
}

const inlineStyles = {
    wrapper: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : undefined
    })
}

export default InputGroup