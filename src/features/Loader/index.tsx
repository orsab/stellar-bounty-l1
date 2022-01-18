import React from 'react'
import { useAppSelector } from '../../app/hooks';
import styles from './styles.module.css'

export function Loader() {
    const status = useAppSelector((state) => state.account.status);

    return status === 'loading' ? <div className={styles.loader}></div> : <></>
}