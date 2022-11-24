import { AppLayout, Button, Card, InputGroup } from 'claim-app/components'
import { ILCheckMark } from 'claim-app/images'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './Submit.module.css'
import Image from 'next/image'

export default function Submit()
{
    const router = useRouter()

    const formData = router?.query?.form ? JSON.parse(router.query.form) : ''
    const imagesData = router?.query?.images ? JSON.parse(router.query.images) : ''

    const [submitSuccess, setSubmitSuccess] = useState(false)

    const goBack = () =>
    {    
        router.replace({
            pathname: '/image-upload',
            query:
            {
                form: JSON.stringify(formData),
                images: JSON.stringify(imagesData)
            }
        }, '/image-upload')
    }

    const submitHandler = async e =>
    {
        e.preventDefault()

        const create = await fetch('http://localhost:3005/claim-data',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const res = await create.json()
        if(res) setSubmitSuccess(true)
    }

    useEffect(() =>
    {
        return () =>
        {
            setSubmitSuccess(false)
        }
    }, [])

    return (
        !submitSuccess ? (
            <AppLayout pageTitle="Pratinjau Data" backButton={goBack}>
                <form onSubmit={submitHandler}>
                    <Card bottomSpace={25}>
                        <InputGroup bottomSpace={20} label="Nama Pengemudi">
                            <span className="value">{formData.name ? formData.name : '-'}</span>
                        </InputGroup>
                        <InputGroup bottomSpace={20} label="Nomor Kendaraan">
                            <span className="value">{formData.vehicle_no ? formData.vehicle_no : '-'}</span>
                        </InputGroup>
                        <InputGroup bottomSpace={20} label="Hubungan dengan Tertanggung">
                            <span className="value">{formData.relation ? formData.relation : '-'}</span>
                        </InputGroup>
                        <InputGroup bottomSpace={20} label="Tanggal dan Waktu Kejadian">
                            <span className="value">{formData.date ? formData.date : '-'}</span>
                        </InputGroup>
                        <InputGroup label="Penyebab">
                            <span className="value">{formData.causes ? formData.causes : '-'}</span>
                        </InputGroup>
                    </Card>

                    <Card bottomSpace={100}>
                        <InputGroup bottomSpace={20} label="Foto SIM">
                            <div className={styles['image-wrapper']}>
                                {formData.photo_driving_license ? (
                                    <img src={formData.photo_driving_license} className={styles.image} alt="" />
                                ) : (
                                    <p className={styles['no-data']}>Tidak ada foto.</p>
                                )}
                            </div>
                        </InputGroup>
                        <InputGroup bottomSpace={20} label="Foto STNK">
                            <div className={styles['image-wrapper']}>
                                {formData.photo_vehicle_license ? (
                                    <img src={formData.photo_vehicle_license} className={styles.image} alt="" />
                                ) : (
                                    <p className={styles['no-data']}>Tidak ada foto.</p>
                                )}
                            </div>
                        </InputGroup>
                        <InputGroup bottomSpace={35} label="Foto KTP Tertanggung">
                            <div className={styles['image-wrapper']}>
                                {formData.photo_id_card ? (
                                    <img src={formData.photo_id_card} className={styles.image} alt="" />
                                ) : (
                                    <p className={styles['no-data']}>Tidak ada foto.</p>
                                )}
                            </div>
                        </InputGroup>

                        <Button type="submit">
                            Simpan
                        </Button>
                    </Card>
                </form>
            </AppLayout>
        ) : (
            <AppLayout>
                <Card>
                    <div className={styles['checkmark-wrapper']}>
                        <Image src={ILCheckMark} className={styles.checkmark} alt="" />
                        <p className={styles['success-text']}>Data berhasil di-submit.</p>
                        <div className={styles['button-wrapper']}>
                            <Button type="button" onClick={() => window.open('http://localhost:3005/claim-data', '_blank')}>
                                Lihat Data JSON
                            </Button>
                            <button type="button" className={styles.button} onClick={() => router.replace('/')}>Kembali ke Beranda</button>
                        </div>
                    </div>
                </Card>
            </AppLayout>
        )
    )
}