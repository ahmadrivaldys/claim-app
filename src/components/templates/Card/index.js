import styles from './Card.module.css'

const Card = ({ children, bottomSpace }) =>
{
    return (
        <div className={styles.card} style={inlineStyles.wrapper(bottomSpace)}>
            {children}
        </div>
    )
}

const inlineStyles = {
    wrapper: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : undefined
    })
}

export default Card