import { AppLayout, Button, Card, ImageUploader, InputGroup } from 'claim-app/components'
import { useForm } from 'claim-app/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './ImageUpload.module.css'

export default function ImageUpload()
{
    const router = useRouter()

    const formData = router?.query?.form ? JSON.parse(router.query.form) : ''
    const imagesData = router?.query?.images ? JSON.parse(router.query.images) : ''

    const initialState = {
        name: '',
        vehicle_no: '',
        relation: '',
        date: '',
        causes: '',
        photo_driving_license: '',
        photo_vehicle_license: '',
        photo_id_card: ''
    }
    
    const [form, setForm] = useForm(formData ? formData : initialState)

    const initialImages = {
        driving_license: [],
        vehicle_license: [],
        id_card: []
    }
    const [images, setImages] = useState(imagesData ? imagesData : initialImages)

    const setImageHandler = (formType, formValue) =>
    {
        setForm(`photo_${formType}`, formValue[0]?.data_url)

        setImages({
            ...images,
            [formType]: formValue
        })
    }

    const goNextHandler = e =>
    {
        e.preventDefault()
    
        router.push({
            pathname: '/submit',
            query:
            {
                form: JSON.stringify(form),
                images: JSON.stringify(images)
            }
        }, '/submit')
    }

    const goBack = () =>
    {    
        router.replace({
            pathname: '/',
            query:
            {
                name: form.name,
                vehicle_no: form.vehicle_no,
                relation: form.relation,
                date: form.date,
                causes: form.causes,
                photo_driving_license: form.photo_driving_license,
                photo_vehicle_license: form.vehicle_license,
                photo_id_card: form.photo_id_card
            }
        }, '/')
    }

    return (
        <AppLayout pageTitle="Unggah Foto" backButton={goBack}>
            <Card bottomSpace={25}>
                <InputGroup bottomSpace={20} label="Nama Pengemudi">
                    <span className="value">{form.name}</span>
                </InputGroup>
                <InputGroup bottomSpace={20} label="Nomor Kendaraan">
                    <span className="value">{form.vehicle_no}</span>
                </InputGroup>
                <InputGroup bottomSpace={20} label="Hubungan dengan Tertanggung">
                    <span className="value">{form.relation}</span>
                </InputGroup>
                <InputGroup bottomSpace={20} label="Tanggal dan Waktu Kejadian">
                    <span className="value">{form.date}</span>
                </InputGroup>
                <InputGroup label="Penyebab">
                    <span className="value">{form.causes}</span>
                </InputGroup>
            </Card>
            
            <Card bottomSpace={100}>
                <form onSubmit={goNextHandler}>
                    <InputGroup bottomSpace={20} label="Foto SIM">
                        <ImageUploader
                            value={images.driving_license}
                            onChange={value => setImageHandler('driving_license', value)}
                        />
                        <span className={styles.span}>* Data pada SIM harus terlihat jelas</span>
                    </InputGroup>
                    <InputGroup bottomSpace={20} label="Foto STNK">
                        <ImageUploader
                            value={images.vehicle_license}
                            onChange={value => setImageHandler('vehicle_license', value)}
                        />
                        <span className={styles.span}>* Data pada STNK harus terlihat jelas</span>
                    </InputGroup>
                    <InputGroup bottomSpace={35} label="Foto KTP Tertanggung">
                        <ImageUploader
                            value={images.id_card}
                            onChange={value => setImageHandler('id_card', value)}
                        />
                        <span className={styles.span}>* Data pada KTP Tertanggung harus terlihat jelas</span>
                    </InputGroup>

                    <Button type="submit">
                        Selanjutnya
                    </Button>
                </form>
            </Card>
        </AppLayout>
    )
}