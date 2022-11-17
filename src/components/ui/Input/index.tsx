import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface textAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}:inputProps){
    return(
        <input className={styles.input} {...rest}/>
    )
}


export function TextArea({...rest}:textAreaProps){
    return(
        <textarea className={styles.input} {...rest}></textarea>
        
    )
}