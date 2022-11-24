import styles from './Input.module.css'

const Input = ({ ...rest }) =>
{
    return <input className={styles.input} spellCheck={false} {...rest} />
}

export default Input